import streamlit.components.v1 as components
import os

build_dir = os.path.join(os.path.dirname(__file__), "frontend")

_pix_match_component = components.declare_component("pix_match", path=build_dir)

def pix_match(difficulty="easy"):
    return _pix_match_component(difficulty=difficulty)
