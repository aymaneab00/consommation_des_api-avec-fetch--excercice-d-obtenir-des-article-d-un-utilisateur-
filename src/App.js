import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [utilisateurs, setutilisateurs] = useState([]);
  const [articles, setarticles] = useState([]);
  const [useractif, setuseractif] = useState(0);
  const [actifbutton,setactifbutton]=useState(false);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json()) //on transorm le resultat de l api (qui est chaine a un json)
      .then((data) => setutilisateurs(data)); // on stock ce quon recoit au "state"
  }, []); // [] : s exprime l obtenation d un api content une seule fois

  useState(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((a) => setarticles(a));
  }, []);

  // consommation d api avec useeffect et methode fetch
  function handleclick(id) {
    setuseractif(id);
    setactifbutton(!actifbutton);
  }
  return (
    <div>
      {utilisateurs.map((u, i) => (
        <div>
          <p key={i}>
            {u.name}{" "}
            <button onClick={() => handleclick(u.id)}>
              Afficher detail d utilisateur{" "}
            </button>{" "}
          </p>
          <div>
            {useractif === u.id & actifbutton===true
              ? articles
                  .filter((a) => a.userId === useractif)
                  .map((article) => 
                   (

                     <div>
                      <h1>{article.title}</h1>
                      <p>{article.body}</p>
                    </div>
                  )
                  ) 
              : null}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
