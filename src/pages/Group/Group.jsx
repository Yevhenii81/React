import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AppContext from "../../features/context/AppContext";
<<<<<<< HEAD
import './ui/Group.css';
=======
import "./ui/Group.css";

>>>>>>> friend/main
import ProductCard from "./ui/ProductCard";

export default function Group() {
    const {slug} = useParams();
    const {request, productGroups} = useContext(AppContext);
    const [pageData, setPageData] = useState( { products:[] } );

    useEffect(() => {
        request("/api/product-group/" + slug)
        .then(setPageData);
<<<<<<< HEAD
    }, [slug]);   // Якщо у тілі ефекту вживається якісь змінні, їх варто додати до спостереження

    return <>
    <h1>Розділ {pageData.name}</h1>
    <h4>{pageData.description}</h4>

    <div className="border m-3 p-2 d-flex">
        {productGroups.map(group => <div key={group.id} className="border m-2 p-1">
            <Link className="nav-link" to={"/group/" + group.slug} >{group.name}</Link>
        </div>)}
=======
    }, [slug]);

    return <>
    <h1>Раздел {pageData.name}</h1>
    <h4>{pageData.description}</h4>

    <div className="border m-2 p-2 d-flex flex-wrap">
      <div className="group-container">
        {productGroups.map(group => (
          <div key={group.id} className="group-item position-relative">
            <Link className="nav-link" to={`/group/${group.slug}`}>
              {group.imageUrl && (
                <img
                  src={group.imageUrl}
                  alt={group.name}
                  className="group-image"
                />
              )}
              <span className="group-name">{group.name}</span>
            </Link>

            <div className="tooltip-content">
              {group.description}
            </div>
          </div>
        ))}
      </div>
>>>>>>> friend/main
    </div>

    <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4 mt-4">
        {pageData.products.map(product => 
<<<<<<< HEAD
            <ProductCard product={product} key={product.id} />
        )}
    </div>
    
    </>;
}

=======
            <ProductCard product={product} key={product.id}/>
        )}
    </div>
    </>;
}
>>>>>>> friend/main
