import "./Footer.css";
import Logo from "../../../../public/images/MOBILE PRI.png"
import Image from "next/image";

const Footer = () =>{
    return(
        <div className="footer flex-md-row flex-column text-center d-flex justify-content-around">
        <Image src={Logo} className='logoImg' alt='logo' width={200} height={10} style={{height:"70px"}}/>
            
            <div>
                <h3>Brands</h3>
                <p>Apple</p>
                <p>Samsung</p>
                <p>Huawei</p>
                <p>Google</p>
                <p>Xiaomi</p>
                <p>Vivo</p>
            </div>
            <div>
                <h3>Models</h3>
                <p>Iphone 16 Pro Max</p>
                <p>S25 Ultra</p>
                <p>P30 Pro</p>
                <p>Pixel 9 Pro</p>
                <p>Redmi Note 14 Pro</p>
                <p>V30 Pro</p>
            </div>
            <div>
                <h3>Pages</h3>
                <p>Home</p>
                <p>Brands</p>
                <p>Models</p>
            </div>
        </div>
    );
}
export default Footer;