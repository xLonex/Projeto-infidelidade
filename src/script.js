document.getElementById("formEmail").addEventListener("submit", async (e) => { 
    e.preventDefault();
  // só pra avisar que o codigo FUNCIONA !
    const form = e.target;
    const formData = new FormData(form);
    const mensagemStatus = document.getElementById("mensagemStatus");
    const btnEnviar = document.getElementById("btnEnviar");
  
    // Desativa o botão para evitar múltiplos envios
    btnEnviar.disabled = true;
    btnEnviar.classList.add("bg-gray-400", "cursor-not-allowed");
    btnEnviar.classList.remove("bg-pink-600", "hover:bg-pink-700");
    mensagemStatus.textContent = "Enviando denúncia...";
    mensagemStatus.classList.remove("text-green-500", "text-red-500");
    mensagemStatus.classList.add("text-gray-500");
  
    try {
      const response = await fetch("https://mensageiro-da-infidelidade.onrender.com/enviar-email", {
        method: "POST",
        body: formData,
      });
  
      console.log("Resposta do servidor:", response); // Depuração
  
      const result = await response.json();
  
      if (response.ok) {
        mensagemStatus.textContent = "Denúncia enviada com sucesso!";
        mensagemStatus.classList.remove("text-red-500", "text-gray-500");
        mensagemStatus.classList.add("text-green-500");
  
        // Reseta o formulário (limpa todos os campos, inclusive o de arquivo)
        form.reset();
  
        // Bloqueia novos envios por 10 segundos para evitar spam
        setTimeout(() => {
          btnEnviar.disabled = false;
          btnEnviar.classList.remove("bg-gray-400", "cursor-not-allowed");
          btnEnviar.classList.add("bg-pink-600", "hover:bg-pink-700");
        }, 10000);
      } else {
        throw new Error(result.error || "Erro ao enviar denúncia");
      }
    } catch (err) {
      console.error("Erro ao enviar denúncia:", err); // Depuração
      mensagemStatus.textContent = err.message;
      mensagemStatus.classList.remove("text-green-500", "text-gray-500");
      mensagemStatus.classList.add("text-red-500");
  
      // Reativa o botão após erro
      btnEnviar.disabled = false;
      btnEnviar.classList.remove("bg-gray-400", "cursor-not-allowed");
      btnEnviar.classList.add("bg-pink-600", "hover:bg-pink-700");
    }
  });
  
  // Pré-visualizador
  document.addEventListener("DOMContentLoaded", function () {
    const mensagemInput = document.getElementById("mensagem");
    const fotoInput = document.getElementById("foto");
    const previewBox = document.getElementById("previewBox");
    const previewContent = document.getElementById("previewContent");
  
    function atualizarPreview() {
      const mensagem = mensagemInput.value.trim();
      const foto = fotoInput.files.length > 0;
  
      if (mensagem) {
        previewBox.classList.remove("hidden");
  
        // Template da mensagem (Lembre-se de deixar igual a mensagemPadrao no enviar-email.js)
        previewContent.innerHTML = `
            <h1 style="color:rgb(200, 39, 39);">Mensageiro da Infidelidade</h1>
            <p>Olá,</p>
            <p>Sei que esta pode não ser a mensagem mais agradável de se receber, mas<strong> alguém de seu ciclo social, de forma anônima,</strong> pediu para que essa informação chegasse até você <strong>sobre uma suposta infidelidade de seu parceiro ou parceira</strong></p>
            <p>Lembre-se: essa mensagem pode ser um trote ou até um golpe, e apenas você pode decidir o que fazer com essa informação. Abaixo, segue o conteúdo da mensagem:</p>
            <blockquote style="font-size: 18px; color: #333; margin-top: 1px; margin-bottom: 1px; padding: 1px;">
              <strong><h2 style="color:rgb(200, 39, 39);">${mensagem}</h2></strong>
            </blockquote>
            ${
              foto
                ? `<p><strong>Anexo:</strong> Uma imagem foi enviada junto com a denúncia. Lembre-se que nos dias de hoje tudo pode ser forjado seja com IA ou Photoshop. Cabe a você decidir e ir atrás das informações</p>`
                : ""
            }
            <p><strong>O que fazer com essa informação é uma escolha apenas sua. Seja qual for que decida seguir, lembre-se que você merece transparência e respeito em qualquer relacionamento</strong></p>
            <p>Entendemos que essa notícia pode ser difícil de lidar, e queremos que saiba que você não está sozinho(a) nessa situação. A dor da traição pode ser avassaladora, mas é importante que busque apoio de amigos, familiares ou profissionais que possam ajudá-lo(a) a enfrentar esse momento.</p>
            <p>POR FAVOR, NÃO RESPONDA A ESSE EMAIL, CASO QUEIRA ENTRAR EM CONTATO COMIGO (Dono do site) mande email aqui: <a href="mailto:lgustavaresl@gmail.com">lgustavaresl@gmail.com</a></p>
            <p><a href="https://mensageiro-da-infidelidade.onrender.com" style="color: #0066cc; text-decoration: underline;">Mensageiro da Infidelidade</a></p>
          `;
      } else {
        previewBox.classList.add("hidden");
      }
    }
  
    mensagemInput.addEventListener("input", atualizarPreview);
    fotoInput.addEventListener("change", atualizarPreview);
  });
  
  // Minimo de 300 caracteres. ! Buscar Feedback para saber se exagerei !
  document.addEventListener("DOMContentLoaded", () => {
    const mensagemInput = document.getElementById("mensagem");
    const btnEnviar = document.getElementById("btnEnviar");
    const charCount = document.getElementById("charCount");
    const minChars = 300; // Mínimo de caracteres necessários
  
    mensagemInput.addEventListener("input", () => {
      const mensagemLength = mensagemInput.value.length;
  
      if (mensagemLength >= minChars) {
        btnEnviar.disabled = false;
        btnEnviar.classList.remove("bg-gray-400", "cursor-not-allowed");
        btnEnviar.classList.add("bg-pink-600", "hover:bg-pink-700");
        charCount.textContent = "Mensagem válida!";
        charCount.classList.remove("text-gray-500", "text-red-500");
        charCount.classList.add("text-green-600");
      } else {
        btnEnviar.disabled = true;
        btnEnviar.classList.remove("bg-pink-600", "hover:bg-pink-700");
        btnEnviar.classList.add("bg-gray-400", "cursor-not-allowed");
        charCount.textContent = `Digite mais ${
          minChars - mensagemLength
        } caracteres para enviar.`;
        charCount.classList.remove("text-green-600");
        charCount.classList.add("text-red-500");
      }
    });
  });
  
  // Sistema daora de mensagem aleatória kkk
  document.addEventListener("DOMContentLoaded", function () {
    const mensagensExemplo = [
      "Peter, eu sei que pode ser difícil acreditar, mas achei que você deveria saber. Ontem, vi Mary saindo de mãos dadas com outra pessoa...",
      "Mary, você não me conhece, mas vi algo que acho que deveria saber. Ontem, na saída do trabalho, vi Peter num restaurante bem íntimo com outra pessoa...",
      "Peter, não quero que me entenda mal, mas vi Mary em um bar abraçada com um cara de um jeito que me deixou desconfortável...",
      "Mary, desculpa me intrometer, mas não consegui ignorar. Vi Peter numa festa e ele não parecia estar agindo como alguém comprometido...",
      "Peter, queria que isso fosse mentira, mas vi Mary com outra pessoa em um café, de mãos dadas e trocando olhares...",
      "Mary, eu estava no shopping ontem e vi Peter com outra mulher. No começo pensei que era uma amiga, mas depois os vi se beijando...",
      "Peter, ontem fui a um restaurante e vi Mary lá com outro cara. Eles estavam sorrindo, conversando baixinho e parecia algo mais íntimo...",
      "Mary, não gosto de me envolver, mas sei que não gostaria de ser enganada. Vi Peter ontem com uma mulher em um parque...",
      "Peter, você não me conhece, mas vi Mary em um evento ontem. Ela estava com outro homem e, pelo jeito que conversavam, parecia algo mais...",
      "Mary, espero que não me leve a mal, mas vi Peter no shopping, e ele não parecia muito fiel...",
      "Peter, não me sinto confortável dizendo isso, mas vi Mary em um restaurante bem aconchegante com outra pessoa...",
      "Mary, eu entendo que isso pode parecer estranho, mas vi Peter ontem com outra pessoa...",
      "Peter, sei que não me conhece, mas achei que deveria saber. Vi Mary no shopping com um cara que parecia mais do que um amigo...",
      "Mary, queria que soubesse que ontem vi Peter numa festa e ele estava muito próximo de outra mulher...",
      "Peter, eu estava em um bar ontem e vi Mary com um cara...",
      "Mary, eu sei que não tenho nada a ver com isso, mas vi Peter em uma cafeteria conversando com uma mulher de forma muito íntima...",
      "Peter, ontem fui a um restaurante e vi Mary com outra pessoa...",
      "Mary, desculpe me intrometer, mas vi Peter saindo de um bar de mãos dadas com outra mulher...",
      "Peter, ontem vi Mary em uma festa, e ela estava bem próxima de outro cara...",
      "Mary, vi algo ontem que me fez pensar. Peter estava em um parque, sentado num banco com outra mulher...",
    ];
  
    const mensagemAleatoria =
      mensagensExemplo[Math.floor(Math.random() * mensagensExemplo.length)];
  
    document
      .getElementById("mensagem")
      .setAttribute("placeholder", mensagemAleatoria);
  });
  
  // Pré-visualizador mobile
  document.addEventListener("DOMContentLoaded", function () {
    const mensagemInput = document.getElementById("mensagem");
    let typingTimeout;
  
    // Função para iniciar o modo de digitação
    function startTypingMode() {
      document.body.classList.add("typing-mode");
    }
  
    // Função para parar o modo de digitação
    function stopTypingMode() {
      document.body.classList.remove("typing-mode");
    }
  
    // Detecta quando o usuário foca na caixa de mensagem
    mensagemInput.addEventListener("focus", () => {
      startTypingMode();
    });
  
    // Detecta quando o usuário começa a digitar
    mensagemInput.addEventListener("input", () => {
      clearTimeout(typingTimeout);
      startTypingMode(); // Sempre que o usuário começar a digitar, ativa o modo de digitação
      typingTimeout = setTimeout(stopTypingMode, 10000); // Após 10 segundos de inatividade, desativa o modo de digitação
    });
  
    // Detecta quando o usuário tira o foco da caixa de mensagem
    mensagemInput.addEventListener("blur", () => {
      setTimeout(() => {
        document.body.classList.remove("typing-mode");
      }, 200);
    });
  });