export async function GetQuote (){
    try{
        const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
        const url = isLocal
            ? '/api/random'
            : 'https://zenquotes.io/api/random';
            
        const response = await fetch('/api/random');
        const data = await response.json();
        console.log(data);
        return {
            quote: data[0].q,
            author: data[0].a
        };
    }
    catch(error){
        console.error("Error aqui:", error.message);
        return { quote: "El único hombre que no se equivoca es el que nunca hace nada.", author: "Goethe" };
    }
}

