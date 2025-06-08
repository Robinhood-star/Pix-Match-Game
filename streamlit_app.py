import streamlit as st
from my_component import pix_match

st.set_page_config(page_title="Pix Match", layout="wide")

# Remove top/bottom padding and center content
st.markdown("""
    <style>
        .block-container {
            padding-top: 0rem;
            padding-bottom: 0rem;
        }
        .stButton>button {
            background-color: #FF4B4B;
            color: white;
            font-weight: bold;
            border-radius: 8px;
            padding: 0.5em 2em;
            margin-top: 20px;
        }
        .stRadio > div { justify-content: start; }
    </style>
""", unsafe_allow_html=True)

# Session state for game logic
if "game_started" not in st.session_state:
    st.session_state.game_started = False

# BEFORE game starts — show intro
if not st.session_state.game_started:
    col1, col2 = st.columns([1, 1])

    with col1:
        st.markdown("### 🧠 Pix Match - Memory Game")
        st.markdown("""
            ### ⏱️ How to Play
            1. Match the shown image with the one in the grid.  
            2. Earn points and combo bonuses for correct picks.  
            3. Time decreases — choose wisely!  
        """)

        difficulty = st.radio("Select difficulty to begin:", ["easy", "medium", "hard"], horizontal=True)

        if st.button("Start Game 🚀"):
            st.session_state.difficulty = difficulty
            st.session_state.game_started = True
            st.rerun()

    with col2:
        st.image("assets/Banner.jpg", width=450)


# AFTER game starts — show only game
else:
    pix_match(st.session_state.difficulty)
