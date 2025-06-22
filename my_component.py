import streamlit as st

def pix_match(difficulty):
    st.markdown(f"### You selected: {difficulty}")

    st.markdown("#### 🎮 Game will appear below:")

    st.markdown(
        """
        <style>
        .responsive-iframe {
            position: relative;
            padding-bottom: 80vh; /* vh = viewport height for better mobile view */
            height: 0;
            overflow: hidden;
            max-width: 100%;
            border: none;
        }

        .responsive-iframe iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: none;
        }
        </style>

        <div class="responsive-iframe">
            <iframe src="https://keen-mousse-d356d0.netlify.app/" frameborder="0" allowfullscreen></iframe>
        </div>
        """,
        unsafe_allow_html=True
    )
