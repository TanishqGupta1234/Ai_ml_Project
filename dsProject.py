import os
import joblib
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
from sklearn.preprocessing import StandardScaler
from xgboost import XGBRegressor, plot_importance

# Reinforcement Learning Libraries
import gymnasium as gym
from stable_baselines3 import DQN
from stable_baselines3.common.env_util import make_vec_env
from flask import Flask, request, jsonify

# ============================
#  Ensure "models" directory exists
# ============================
os.makedirs("models", exist_ok=True)

# ============================
#       Load and Preprocess Data
# ============================
df = pd.read_csv(r"sports_data_encoded.csv")

# Feature selection
df.drop(columns=['Athlete_ID', 'name', 'email_id'], inplace=True, errors='ignore')

# Ensure Injury_Risk column exists
if 'Injury_Risk' not in df.columns:
    np.random.seed(42)
    df['Injury_Risk'] = np.random.choice([0, 1], size=len(df))  # Simulated injury data (0 = No, 1 = Yes)

# ============================
#   Performance Score Regression
# ============================
plt.figure(figsize=(10, 8))
corr = df.corr()
sns.heatmap(corr[['Performance_Score']].sort_values(by='Performance_Score', ascending=False), annot=True, cmap='coolwarm')
plt.title("Feature Correlation with Performance Score")
plt.show()

# Features and Target
target = 'Performance_Score'
X = df.drop(columns=[target, 'Injury_Risk'])  # Exclude Injury_Risk for regression
y = df[target]

# Scale the data
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Train-Test Split
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

# ============================
#  Train XGBoost Model
# ============================
xgb = XGBRegressor(objective='reg:squarederror', random_state=42)

param_grid = {
    'n_estimators': [100, 200, 300],
    'max_depth': [4, 6, 8],
    'learning_rate': [0.01, 0.05, 0.1],
    'subsample': [0.8, 1.0],
}

grid_search = GridSearchCV(estimator=xgb, param_grid=param_grid, cv=3, scoring='r2', n_jobs=-1, verbose=1)
grid_search.fit(X_train, y_train)

best_xgb = grid_search.best_estimator_
print("Best XGBoost Parameters:", grid_search.best_params_)

# Predict and Evaluate
y_pred_xgb = best_xgb.predict(X_test)

def evaluate(y_true, y_pred):
    print("\n[ XGBoost Final Model Evaluation ]")
    print("R² Score :", r2_score(y_true, y_pred))
    print("MAE      :", mean_absolute_error(y_true, y_pred))
    print("RMSE     :", np.sqrt(mean_squared_error(y_true, y_pred)))

evaluate(y_test, y_pred_xgb)

# Plot Feature Importance
plt.figure(figsize=(12, 6))
plot_importance(best_xgb, max_num_features=10, importance_type='gain')
plt.title("Top Feature Importance - XGBoost")
plt.show()

# Save Models
joblib.dump(best_xgb, "models/xgboost_performance.pkl")
joblib.dump(scaler, "models/scaler.pkl")
print(" XGBoost Model & Scaler Saved!")

# ============================
#  Train DQN Model (Reinforcement Learning)
# ============================
print("\n[ Reinforcement Learning - DQN for Team Optimization ]")
env = make_vec_env('CartPole-v1', n_envs=1)

# Train the DQN Model
dqn_model = DQN("MlpPolicy", env, verbose=1)
dqn_model.learn(total_timesteps=10000)

# Save the DQN Model
dqn_model.save("models/dqn_model.zip")
print(" DQN Model Saved!")

# ============================
#  Flask API for Deployment
# ============================
app = Flask(__name__)

# Load Saved Models
xgb_model = joblib.load("models/xgboost_performance.pkl")
scaler = joblib.load("models/scaler.pkl")
dqn_model = DQN.load("models/dqn_model.zip")

# API Route for XGBoost Predictions
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json['features']
        data_array = np.array(data).reshape(1, -1)  # Convert to 2D array
        data_scaled = scaler.transform(data_array)
        prediction = xgb_model.predict(data_scaled)[0]
        return jsonify({"performance_score": float(prediction)})
    
    except Exception as e:
        return jsonify({"error": str(e)})

# API Route for Team Optimization using RL
@app.route('/optimize_team', methods=['GET'])
def optimize_team():
    try:
        env = dqn_model.get_env()
        obs = env.reset()
        action, _states = dqn_model.predict(obs, deterministic=True)
        return jsonify({"optimal_action": int(action[0])})
    
    except Exception as e:
        return jsonify({"error": str(e)})

# Run Flask Server
if __name__ == '__main__':
    app.run(debug=True)
