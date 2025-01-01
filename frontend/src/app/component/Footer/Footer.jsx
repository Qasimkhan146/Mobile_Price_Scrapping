import "./Footer.css";
import Logo from "../../../../public/images/MOBILE PRI.png"
import Image from "next/image";
import Link from "next/link";

const Footer = () =>{
    return(
        <div className="footer flex-md-row flex-column text-center d-flex justify-content-around">
       <Link href="/"> <Image src={Logo} className='logoImg' alt='logo' width={200} height={10}/> </Link>
            
            <div className="d-flex flex-column">
                <h3>Brands</h3>
                <Link href="/AdvanceSearch?brand=Apple">Apple</Link>
                <Link href="/AdvanceSearch?brand=Samsung">Samsung</Link>
                <Link href="/AdvanceSearch?brand=Huawei">Huawei</Link>
                <Link href="/AdvanceSearch?brand=Google">Oppo</Link>
                <Link href="/AdvanceSearch?brand=Xiaomi">Xiaomi</Link>
                <Link href="/AdvanceSearch?brand=Vivo">Vivo</Link>
            </div>
            <div className="d-flex flex-column">
                <h3>Models</h3>
                <Link href="/AdvanceSearch?model=Iphone+16+Pro+Max">Iphone 16 Pro Max</Link>
                <Link href="/AdvanceSearch?model=Galaxy+S24">Galaxy S24</Link>
                <Link href="/AdvanceSearch?model=P30+Pro">P30 Pro</Link>
                <Link href="/AdvanceSearch?model=OPPO+RENO+11">OPPO RENO 11</Link>
                <Link href="/AdvanceSearch?model=XIAOMI+REDMI+10">XIAOMI REDMI 10</Link>
                <Link href="/AdvanceSearch?model=VIVO+X70+PRO">VIVO X70 PRO</Link>
            </div>
            <div>
                <h3>Pages</h3>
                <Link href="/">Home</Link>
                <Link href="/AdvanceSearch">AdvanceSearch</Link>
            </div>
        </div>
    );
}
export default Footer;