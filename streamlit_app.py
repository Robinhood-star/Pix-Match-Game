import streamlit as st
from my_component import pix_match

st.set_page_config(page_title="Pix Match", layout="wide")

st.title("🧠 Pix Match - Memory Game")

st.markdown("""
### 🎯 How to Play
1. Match the shown image with the one in the grid.
2. Earn points and combo bonuses for correct picks.
3. Time decreases — choose wisely!

Select difficulty to begin:
""")

difficulty = st.radio("Choose Difficulty:", ["easy", "medium", "hard"], horizontal=True)
start = st.button("Start Game")

if start:
    pix_match(difficulty=difficulty)
