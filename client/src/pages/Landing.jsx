
import main from '../assets/images/undraw_traveling_yhxq.svg'
import styled from 'styled-components'
import {NavLink} from 'react-router-dom'
import {Logo} from '../components'



const Landing = () => {
    return (
        <Wrapper>
            <nav>
                <Logo/>
            </nav>
            <div className="container page">
                <div className="info">
                    <h1>job <span>tracking</span> app</h1>
                    <p>
                    Leggings kale chips waistcoat aesthetic lo-fi gluten-free wayfarers keffiyeh sustainable retro health goth marxism. Vexillologist semiotics keffiyeh, bicycle rights snackwave hot chicken offal meggings glossier hoodie hashtag single-origin coffee.
                    </p>
                    <NavLink to="/register">
                    <button className="btn btn-hero">
                        Login/Register
                    </button>
                    </NavLink>
                </div>
                <img src={main} alt="job hunt" className="img main-img " />
            </div>
        </Wrapper>
    )
}


const Wrapper = styled.main`
    nav {
        width : var(--fluid-width);
        max-width : var(--max-width);
        margin: 0 auto;
        height: var(--nav-height);
        display: flex;
        align-items: center;
    }

    .page {
        min-height: calc(100vh - var(--nav-height));
        display: grid;
        align-items: center;
        margin-top: -3rem;
    }

    h1 {
        font-weight: 700;

        span {
            color: var(--primary-500);
        }
    }

    p {
        color: var(--grey-600);
    }

    .main-img {
        display: none;
    }

    @media (min-width : 992px) {
        .page {
            grid-template-columns: 1fr 1fr;
            column-gap: 3rem;
        }

        .main-img {
            display: block;
        }
    }
    
`

export default Landing