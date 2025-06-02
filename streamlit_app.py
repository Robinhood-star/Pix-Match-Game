import streamlit as st
from my_component import pix_match

st.set_page_config(page_title="Pix Match", layout="wide")

# Session state to track game start
if "game_started" not in st.session_state:
    st.session_state.game_started = False

# If game hasn't started, show intro
if not st.session_state.game_started:
    st.title("🧠 Pix Match - Memory Game")

    st.markdown("""
    <style>
        .intro-text { font-size: 18px; line-height: 1.6; }
        .stButton>button {
            background-color: #FF4B4B;
            color: white;
            font-weight: bold;
            border-radius: 8px;
            padding: 0.5em 2em;
            margin-top: 20px;
        }
        .stRadio > div { justify-content: center; }
    </style>
    """, unsafe_allow_html=True)

    st.markdown("""
    <div class='intro-text'>
    🎯 <b>How to Play</b><br>
    1. Match the shown image with the one in the grid.<br>
    2. Earn points and combo bonuses for correct picks.<br>
    3. Time decreases — choose wisely!<br><br>
    Select difficulty to begin:
    </div>
    """, unsafe_allow_html=True)

    difficulty = st.radio("", ["easy", "medium", "hard"], horizontal=True)

    # ✅ Fixed indentation for this line
    st.image("assets/Banner.jpg", use_column_width=True)

    if st.button("Start Game 🚀"):
        st.session_state.difficulty = difficulty
        st.session_state.game_started = True
        st.experimental_rerun()

# Game section
else:
    st.title("🎮 Pix Match Game Zone")
    pix_match(st.session_state.difficulty)
