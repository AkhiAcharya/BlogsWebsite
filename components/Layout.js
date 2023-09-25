import Navbar from "/components/Navbar";
// import Footer from "/components/Footer";

const Layout = ({children}) => {
    return (
        <div className="content">
            <Navbar></Navbar>
                { children }
            {/* <Footer></Footer> */}
        </div>
    );
}
 
export default Layout;

