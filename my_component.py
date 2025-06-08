import streamlit as st

def pix_match(difficulty):
    st.markdown(f"### 🎯 You selected: {difficulty}")
    st.components.v1.iframe(
        "https://keen-mousse-d356d0.netlify.app",  # Your hosted game
        height=860,  # Best fit for your game's layout (adjust if needed)
        scrolling=False
    )
