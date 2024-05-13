import ControleLivro from "./controle/ControleLivros";
import ControleEditora from "./controle/ControleEditora";
import React, {useState, useEffect} from "react";

//Instâncias das classes.
const controleLivro = new ControleLivro();
const controleEditora = new ControleEditora();

//Componente para a linha com informações do livro e botão de excluir.
function LinhaLivro (props) {
    const {livro, excluir} = props;
    const nomeEditora = controleEditora.getNomeEditora(livro.codEditora);
    return (
        <tr>
            <td>
                <div className="d-flex flex-column">
                    <span>{livro.titulo}</span>
                    <button type="button" className="btn btn-danger col-md-6" onClick={() => excluir(livro.codigo)}>Excluir</button>
                </div>
            </td>
            <td>{livro.resumo}</td>
            <td>{nomeEditora}</td>
            <td>{livro.autores.map((autor, index) => (<li key = {index}>{autor}</li>))}</td>
        </tr>
    )
}
//Componente para carregamento dos livros.
function LivroLista () {
    const [livros, setLivros] = useState ([]);
    const [carregado, setCarregado] = useState (false);
    useEffect (() => {
        const obterLivros = async() => {
            const livros = await controleLivro.obterLivros ();
            setLivros(livros);
            setCarregado(true);
        }
        if (!carregado) {obterLivros();}
    }, [carregado]);

    //Método para excluir o livro.
    const excluir = (codigo) => {
         controleLivro.excluir (codigo);
        setCarregado (false);
    }
    return (
        <div className="container-fluid">
            <main>
                <h1 className="d-flex text-left my-2">Catálogo de livros</h1>
                <table className="table table-striped">
                    <thead className="bg-dark text-light">
                        <td className="col-2 text-left p-2">Título</td>
                        <td className="col-6 text-left p-2">Resumo</td>
                        <td className="col-2 text-left p-2">Editora</td>
                        <td className="col-2 text-left p-2">Autores</td>
                    </thead>
                    <tbody class = "">
                        {livros.map(livro => (
                            <LinhaLivro key = {livro.codigo} livro = {livro} excluir = {excluir}/>
                        ))}
                    </tbody>
                </table>
            </main>
        </div>
    )
}
export default LivroLista;