from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
import joblib
import os
from sklearn.preprocessing import StandardScaler
from xgboost import XGBRegressor
from stable_baselines3 import DQN
from stable_baselines3.common.env_util import make_vec_env
import gymnasium as gym
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# ============================
#       Load Datasets
# ============================
DATA_PATH_ENCODED = "C:\\Users\\User HP\\Documents\\DataScienceProject\\dsProject\\sports_data_encoded.csv"
DATA_PATH_COACH = "C:\\Users\\User HP\\Documents\\DataScienceProject\\dsProject\\coach_dataset.xlsx"

if not os.path.exists(DATA_PATH_ENCODED):
    raise FileNotFoundError(f"Dataset not found at {DATA_PATH_ENCODED}. Please check the file path.")

df = pd.read_csv(DATA_PATH_ENCODED)
df.drop(columns=['Athlete_ID', 'name', 'email_id'], inplace=True, errors='ignore')

if 'Injury_Risk' not in df.columns:
    np.random.seed(42)
    df['Injury_Risk'] = np.random.choice([0, 1], size=len(df))

# Feature Selection
target = 'Performance_Score'
X = df.drop(columns=[target, 'Injury_Risk'])
y = df[target]

# Load Coach Dataset for Login
if not os.path.exists(DATA_PATH_COACH):
    raise FileNotFoundError(f"Coach dataset not found at {DATA_PATH_COACH}. Please check the file path.")

df_coach = pd.read_excel(DATA_PATH_COACH, sheet_name=0)

# ============================
#   Train and Save Models
# ============================
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Train XGBoost Model
xgb = XGBRegressor(objective='reg:squarederror', random_state=42, n_estimators=200, max_depth=6, learning_rate=0.05)
xgb.fit(X_scaled, y)

# Save the Model and Scaler
joblib.dump(xgb, "xgboost_performance.pkl")
joblib.dump(scaler, "scaler.pkl")

print(" XGBoost Model and Scaler Saved!")

# ============================
#       API Endpoints
# ============================

@app.route("/")
def home():
    return jsonify({"message": "Server is running! Use /predict, /train_rl, or /login"})

# API: Coach Login
@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.json
        email = data.get("email")
        password = data.get("password")
        
        if not email or not password:
            return jsonify({"error": "Email and Password required!"})
        
        coach = df_coach[(df_coach['email'] == email) & (df_coach['password'] == password)]
        if not coach.empty:
            return jsonify({"message": "Login Successful"})
        else:
            return jsonify({"error": "Invalid Credentials"})
    
    except Exception as e:
        return jsonify({"error": str(e)})

# API: Predict Performance Score
@app.route('/predict', methods=['POST'])
def predict():
    try:
        if not os.path.exists("xgboost_performance.pkl") or not os.path.exists("scaler.pkl"):
            return jsonify({"error": "Model or Scaler not found! Train the model first."})

        data = request.json.get("features", None)
        if data is None:
            return jsonify({"error": "No input features provided!"})

        model = joblib.load("xgboost_performance.pkl")
        scaler = joblib.load("scaler.pkl")

        X_new = scaler.transform([data])
        prediction = model.predict(X_new)[0]

        return jsonify({"Performance_Score": float(prediction)})

    except Exception as e:
        return jsonify({"error": str(e)})

# API: Train Reinforcement Learning Model
@app.route('/train_rl', methods=['POST'])
def train_rl():
    try:
        env = make_vec_env('CartPole-v1', n_envs=1)
        model = DQN("MlpPolicy", env, verbose=1)
        model.learn(total_timesteps=10000)
        model.save("dqn_model")

        return jsonify({"message": "Reinforcement Learning Model Trained and Saved!"})

    except Exception as e:
        return jsonify({"error": str(e)})

# ============================
#       Run Server
# ============================
if __name__ == '__main__':
    app.run(debug=True)
