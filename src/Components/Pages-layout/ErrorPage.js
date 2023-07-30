import Header from "../Layout/Header/Header";

const ErrorPage = () => {
    return (
        <>
            <Header />
            <main>
                <h1>An error occurred!</h1>
                <p>Could not find the page you requested!</p>
            </main>
        </>
    )
}

export default ErrorPage;