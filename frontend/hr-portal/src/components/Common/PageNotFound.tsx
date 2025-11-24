import React, { useState } from "react";
import './page.css'
const PageNotFound: React.FC = () => {
  const [data, setData] = useState<any[]>([]); // You can replace 'any' with the correct type if known

  return (
    <section className="page-not-found-con">
      <div className="page-not-left-con">
        <img
          src="/src/assets/page-not-found/page-not-found.jpg"
          alt="Page Not Found"
        />
      </div>
      <div className="page-not-right-con">
        <h1>401</h1>
        <h2>We are Sorry...</h2>
        <p>
          The page you are trying to access has restricted access. Please
          refer to your administrator.
        </p>
      </div>
    </section>
  );
};

export default PageNotFound;
