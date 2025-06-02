import streamlit as st

def pix_match(difficulty):
    st.markdown(f"### You selected: {difficulty}")

    st.markdown("#### 🎮 Game will appear below:")

    st.components.v1.iframe("https://your-react-game.netlify.app", height=600)
