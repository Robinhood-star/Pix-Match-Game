import streamlit as st

def pix_match(difficulty):
    # Embed game fullscreen with no scroll
    st.components.v1.iframe("https://keen-mousse-d356d0.netlify.app", height=1400, scrolling=False)
