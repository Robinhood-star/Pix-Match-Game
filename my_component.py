import streamlit as st

def pix_match(difficulty):
    # Dynamically increase the height only after game starts
    iframe_height = 1150  # Adjust this if still cut off

    # Embed full game view
    st.components.v1.iframe("https://keen-mousse-d356d0.netlify.app", height=iframe_height, scrolling=False)
