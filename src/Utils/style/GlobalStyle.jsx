import { createGlobalStyle } from 'styled-components'

const StyledGlobalStyle = createGlobalStyle`
html {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  margin: 0;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main {
  flex: 1;
}

.bg-dark {
  background-color: #12002b;
}

.sr-only {
  border: 0 !important;
  clip: rect(1px, 1px, 1px, 1px) !important; /* 1 */
  -webkit-clip-path: inset(50%) !important;
  clip-path: inset(50%) !important; /* 2 */
  height: 1px !important;
  margin: -1px !important;
  overflow: hidden !important;
  padding: 0 !important;
  position: absolute !important;
  width: 1px !important;
  white-space: nowrap !important; /* 3 */
}

.main-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 20px;
}

.main-nav a {
  font-weight: bold;
  color: #2c3e50;
}

.main-nav a.router-link-exact-active {
  color: #42b983;
}

.main-nav-item {
  text-decoration: none;
  margin-right: 0.5rem;
}

.main-nav-item:hover {
  text-decoration: underline;
}

.main-nav-logo {
  display: flex;
  align-items: center;
}

.main-nav-logo-image {
  max-width: 100%;
  width: 200px;
}

.hero {
  background-image: url("../../Assets/bank-tree.jpeg");
  background-position: 0 -50px;
  background-size: cover;
  background-repeat: no-repeat;
  height: 300px;
  position: relative;
}

.hero-content {
  position: relative;
  top: 2rem;
  width: 200px;
  background: white;
  padding: 2rem;
  text-align: left;
  margin: 0 auto;
}

.hero-content .subtitle {
  font-weight: bold;
  font-size: 1rem;
  margin: 0;
}

.hero-content .text {
  margin-bottom: 0;
  font-size: 0.9rem;
}

@media (min-width: 920px) {
  .hero {
    height: 400px;
    background-position: 0% 33%;
  }

  .hero-content {
    position: absolute;
    top: 50px;
    right: 50px;
    width: 300px;
    margin: 2rem;
  }

  .hero-content .subtitle {
    font-size: 1.5rem;
  }

  .hero-content .text {
    font-size: 1.2rem;
  }
}

.features {
  display: flex;
  flex-direction: column;
}

@media (min-width: 920px) {
  .features {
    flex-direction: row;
  }
}

.feature-icon {
  width: 100px;
  border: 10px solid #00bc77;
  border-radius: 50%;
  padding: 1rem;
}

.feature-item {
  flex: 1;
  padding: 2.5rem;
}

.feature-item-title {
  color: #222;
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.sign-in-button {
  display: block;
  width: 100%;
  padding: 8px;
  font-size: 1.1rem;
  font-weight: bold;
  margin-top: 1rem;
  border-color: #00bc77;
  background-color: #00bc77;
  color: #fff;
}

.sign-in-content {
  box-sizing: border-box;
  background-color: white;
  width: 300px;
  margin: 0 auto;
  margin-top: 3rem;
  padding: 2rem;
}

.sign-in-icon {
  font-size: 5rem;
}

.input-remember {
  display: flex;
}

.input-remember label {
  margin-left: 0.25rem;
}

.input-wrapper {
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-bottom: 1rem;
}

.input-wrapper label {
  font-weight: bold;
}

.input-wrapper input {
  padding: 5px;
  font-size: 1.2rem;
}

.footer {
  display: flex;
  justify-content: center;
  border-top: 2px solid #ccc;
  padding: 2rem 0 1.5rem;
}

.footer-text {
  margin: 0;
  padding: 0;
}

.account {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid black;
  background-color: #fff;
  width: 80%;
  margin: 0 auto;
  flex-direction: column;
  padding: 1.5rem;
  box-sizing: border-box;
  text-align: left;
  margin-bottom: 2rem;
}

.account-amount {
  margin: 0;
  font-size: 2.5rem;
  font-weight: bold;
}

.account-amount-description {
  margin: 0;
}

.account-title {
  margin: 0;
  padding: 0;
  font-size: 1rem;
  font-weight: normal;
}

.account-content-wrapper {
  width: 100%;
  flex: 1;
}

.edit-button {
  border-color: #00bc77;
  background-color: #00bc77;
  color: #fff;
  font-weight: bold;
  padding: 10px;
}

.header {
  color: #fff;
  margin-bottom: 2rem;
}

.transaction-button {
  display: block;
  width: 100%;
  padding: 8px;
  font-size: 1.1rem;
  font-weight: bold;
  margin-top: 1rem;
  border-color: #00bc77;
  background-color: #00bc77;
  color: #fff;
}

@media (min-width: 720px) {
  .account {
    flex-direction: row;
  }

  .account-content-wrapper.cta {
    flex: 0;
  }

  .transaction-button {
    width: 200px;
  }
}

`

function GlobalStyle() {
    return <StyledGlobalStyle />
}

export default GlobalStyle