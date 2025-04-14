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
# Load Dataset
# ============================
DATA_PATH = r"/Users/tanishqmacbook/Desktop/Ds_project/Ai_ml_Project/sports_data_encoded.csv"

if not os.path.exists(DATA_PATH):
    raise FileNotFoundError(f"Dataset not found at {DATA_PATH}. Please check the file path.")

df = pd.read_csv(DATA_PATH)
df.drop(columns=['Athlete_ID', 'name', 'email_id'], inplace=True, errors='ignore')

if 'Injury_Risk' not in df.columns:
    np.random.seed(42)
    df['Injury_Risk'] = np.random.choice([0, 1], size=len(df))

target = 'Performance_Score'
X = df.drop(columns=[target, 'Injury_Risk'])
y = df[target]

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Train XGBoost Model
xgb = XGBRegressor(objective='reg:squarederror', random_state=42, n_estimators=200, max_depth=6, learning_rate=0.05)
xgb.fit(X_scaled, y)

# Save Model and Scaler
joblib.dump(xgb, "xgboost_performance.pkl")
joblib.dump(scaler, "scaler.pkl")

print("✅ XGBoost Model and Scaler Saved!")

# ============================
# API Endpoints
# ============================

@app.route("/")
def home():
    return jsonify({"message": "Server is running!"})

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

        data_array = np.array(data).reshape(1, -1)

        # =========================
        # Validate Age, Height, Weight
        # =========================
        age_value = data_array[0][0]    # Assuming Age is at index 0
        weight_value = data_array[0][1] # Assuming Weight is at index 1
        height_value = data_array[0][2] # Assuming Height is at index 2

        # Age validation
        if age_value < 17 or age_value > 40:
            return jsonify({"error": "Invalid Age entered! Age must be between 17 and 40 years."})

        # Height validation
        if height_value < 100 or height_value > 250:
            return jsonify({"error": "Invalid Height entered! Height must be between 100 and 250 cm."})

        # Weight validation
        if weight_value <= 0:
            return jsonify({"error": "Invalid Weight entered! Weight must be greater than 0."})

        # =========================
        # Predict normally
        # =========================
        X_new = scaler.transform(data_array)
        prediction = model.predict(X_new)[0]

        # =========================
        # Apply Weight Penalty
        # =========================
        if weight_value < 52 or weight_value > 90:
            penalty_factor = 0.5 if weight_value < 52 else 0.3
            adjusted_prediction = prediction * penalty_factor
            return jsonify({
                "Performance_Score": float(adjusted_prediction),
                "note": f"Weight {weight_value} is not in optimal range (52–90 kg). Score has been penalized."
            })

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
# Run Server
# ============================
if __name__ == '__main__':
    app.run(debug=True)