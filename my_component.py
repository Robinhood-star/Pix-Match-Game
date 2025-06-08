import streamlit as st

def pix_match(difficulty):
    st.markdown(f"### You selected: {difficulty}")
    st.markdown("#### 🎮 Game will appear below:")

    # Increase iframe height to fully display the game
    st.components.v1.iframe("https://keen-mousse-d356d0.netlify.app", height=850)
