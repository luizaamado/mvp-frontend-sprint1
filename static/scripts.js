  /*
    --------------------------------------------------------------------------------------
    Função para obter a lista existente do servidor via requisição GET
    --------------------------------------------------------------------------------------
  */
  const getAllMovies = async () => {
      let url = 'http://127.0.0.1:5000/filmes';
      fetch(url, {
        method: 'get',
      })
        .then((response) => response.json())
        .then((data) => {
          data.filmes.forEach(item => insertMovies(item.titulo, item.ano, item.genero, item.sinopse, item.assistido, item.avaliacao))
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }

  /*
    --------------------------------------------------------------------------------------
    Chamada da função para carregamento inicial dos dados
    --------------------------------------------------------------------------------------
  */
  getAllMovies()
  
  /*
  -------------------------------------------------------------------------------------------
  Função para obter a lista existente de filmes não assistidos do servidor via requisição GET
  -------------------------------------------------------------------------------------------
  */
  const getMoviesNotWatched = async () => {
    let url = 'http://127.0.0.1:5000/filmes-nao-assistidos';
    fetch(url, {
      method: 'get',
    })
      .then((response) => response.json())
      .then((data) => {
        data.filmes.forEach(item => insertNotWatchedMovie(item.titulo, item.ano, item.genero, item.sinopse, item.assistido, item.avaliacao))
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

    /*
    --------------------------------------------------------------------------------------
    Chamada da função para carregamento inicial dos dados dos filmes não assistidos
    --------------------------------------------------------------------------------------
  */
    getMoviesNotWatched()

  /*
    --------------------------------------------------------------------------------------
    Função para colocar um filme na lista do servidor via requisição POST
    --------------------------------------------------------------------------------------
  */
  const postItem = async (inputTitle, inputYear, inputGenre, inputSynopsis, inputWatched, inputScore) => {
    const formData = new FormData();
    formData.append('titulo', inputTitle);
    formData.append('ano', inputYear);
    formData.append('genero', inputGenre);
    formData.append('sinopse', inputSynopsis);
    formData.append('assistido', inputWatched);
    formData.append('avaliacao', inputScore);
  
    let url = 'http://127.0.0.1:5000/filme';
    fetch(url, {
      method: 'post',
      body: formData
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  /*
    --------------------------------------------------------------------------------------
    Função para criar um botão close para cada item da lista
    --------------------------------------------------------------------------------------
  */
  const insertButton = (parent) => {
    let span = document.createElement("span");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    parent.appendChild(span);
  }
  
  /*
    --------------------------------------------------------------------------------------
    Função para remover um item da lista de acordo com o click no botão close
    --------------------------------------------------------------------------------------
  */
  const removeElement = () => {
    let close = document.getElementsByClassName("close");
    // var table = document.getElementById('myTable');
    let i;
    for (i = 0; i < close.length; i++) {
      close[i].onclick = function () {
        let div = this.parentElement.parentElement;
        const tituloItem = div.getElementsByTagName('td')[0].innerHTML
        if (confirm("Você tem certeza?")) {
          div.remove()
          deleteItem(tituloItem)
          alert("Removido!")
        }
      }
    }
  }
  
  /*
    --------------------------------------------------------------------------------------
    Função para deletar um item da lista do servidor via requisição DELETE
    --------------------------------------------------------------------------------------
  */
  const deleteItem = (item) => {
    console.log(item)
    let url = 'http://127.0.0.1:5000/filme?titulo=' + item;
    fetch(url, {
      method: 'delete'
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  /*
    -------------------------------------------------------------------------------------------
    Função para adicionar um novo filme com titulo, ano, genero, sinopse, assistido e avaliação
    -------------------------------------------------------------------------------------------
  */
  const newItem = () => {
    let inputTitle = document.getElementById("newTitle").value;
    let inputYear = document.getElementById("newYear").value;
    let inputGenre = document.getElementById("newGenre").value;
    let inputSynopsis = document.getElementById("newSynopsis").value;
    let inputWatched = document.getElementById("newWatched").value;
    let inputScore = document.getElementById("newScore").value;
  
    if (inputTitle === '') {
      alert("Escreva o título do filme!");
    } else if (isNaN(inputYear) || isNaN(inputScore)) {
      alert("Ano e avaliação precisam ser números!");
    } else {
      postItem(inputTitle, inputYear, inputGenre, inputSynopsis, inputWatched, inputScore)
      alert("Filme adicionado!")
    }
  }

  /*
  --------------------------------------------------------------------------------------
  Função para capturar o título do filme a ser buscado
  --------------------------------------------------------------------------------------
  */
  // const searchMovie = () => {
  //   let inputTitle = document.getElementById("inputTitle").value;
  //   if (inputTitle === '') {
  //     alert("Escreva o título do filme!");
  //   }
  //   else {
  //     getMovie(inputTitle);
  //   }
  // }
  
   /*
  --------------------------------------------------------------------------------------
  Função para obter um filme existente do servidor via requisição GET, dado um título
  --------------------------------------------------------------------------------------
  */
  // const getMovie = (movie) => {
  //   let url = 'http://127.0.0.1:5000/filme?titulo=' + movie;
  //   fetch(url, {
  //     method: 'get',
  //   })
  //     .then((response) => response.json())
  //     .then((data) => showMovie(data.titulo, data.ano, data.genero, data.sinopse, data.assistido, data.avaliacao))
  //     .catch((error) => {
  //       console.error('Error:', error);
  //     });
  // }

  /*
    --------------------------------------------------------------------------------------
    Função para apresentar filme buscado
    --------------------------------------------------------------------------------------
  */
  // const showMovie = (title, year, genre, synopsis, watched, score) => {
  //   var item = [title, year, genre, synopsis, watched, score]
  //   var table = document.getElementById('movieTable');
  //   var row = table.insertRow();
  
  //   for (var i = 0; i < item.length; i++) {
  //     var cel = row.insertCell(i);
  //     cel.textContent = item[i];
  //   }
  //   insertButton(row.insertCell(-1))
  
  //   removeElement()
  // }

    /*
    --------------------------------------------------------------------------------------
    Função para inserir filmes na lista geral de filmes
    --------------------------------------------------------------------------------------
  */
    const insertMovies = (title, year, genre, synopsis, watched, score) => {
      var item = [title, year, genre, synopsis, watched, score]
      var table = document.getElementById('myTable');
      var row = table.insertRow();
    
      for (var i = 0; i < item.length; i++) {
        var cel = row.insertCell(i);
        cel.textContent = item[i];
      }
      insertButton(row.insertCell(-1))
    
      removeElement()
    }

  /*
    --------------------------------------------------------------------------------------
    Função para inserir filmes na lista de filmes não assistidos
    --------------------------------------------------------------------------------------
  */
    const insertNotWatchedMovie = (title, year, genre, synopsis, watched, score) => {
      var item = [title, year, genre, synopsis, watched, score]
      var table = document.getElementById('moviesNotWatchedTable');
      var row = table.insertRow();
    
      for (var i = 0; i < item.length; i++) {
        var cel = row.insertCell(i);
        cel.textContent = item[i];
      }
    }