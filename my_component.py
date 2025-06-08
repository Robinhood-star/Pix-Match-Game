import streamlit as st

def pix_match(difficulty):
    # Embed game fullscreen-like with enough height
    st.components.v1.iframe("https://keen-mousse-d356d0.netlify.app", height=1100, scrolling=False)
