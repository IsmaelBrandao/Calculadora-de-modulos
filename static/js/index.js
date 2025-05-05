// Função para exibir mensagens de feedback
function exibirMensagem(mensagem, tipo) {
    const divMensagem = document.getElementById("mensagem");
    divMensagem.textContent = mensagem;
    divMensagem.className = tipo;
    divMensagem.style.display = "block";
    setTimeout(() => divMensagem.style.display = "none", 3000);
}

// Função para adicionar uma nova lista
function adicionarLista() {
    const container = document.getElementById("lista-container");
    const novoCard = document.createElement("div");
    novoCard.className = "lista-card";
    novoCard.innerHTML = `
        <div class="header">
            <input type="text" name="nome_lista" placeholder="Nome da Lista">
            <div class="icons">
                <button type="button" class="edit-button">✏️</button>
                <button type="button" class="delete-button">❌</button>
            </div>
        </div>
        <textarea name="lista" placeholder="Insira os elementos separados por vírgula (ex: João, Maria, Pedro)"></textarea>
    `;
    container.appendChild(novoCard);

    // Adiciona eventos aos botões dentro do novo card
    const botaoEditar = novoCard.querySelector(".edit-button");
    const botaoExcluir = novoCard.querySelector(".delete-button");

    botaoEditar.addEventListener("click", () => alternarEdicao(botaoEditar));
    botaoExcluir.addEventListener("click", () => excluirLista(botaoExcluir));
}

// Função para alternar entre modo de edição e modo de visualização
function alternarEdicao(botao) {
    const card = botao.closest(".lista-card");
    const inputs = card.querySelectorAll("input, textarea");

    inputs.forEach((input) => {
        input.readOnly = !input.readOnly;
    });

    // Altera o ícone do botão
    botao.textContent = inputs[0].readOnly ? "✏️" : "✔️";
}

// Função para excluir uma lista
function excluirLista(botao) {
    const card = botao.closest(".lista-card");
    card.remove();
    salvarListas();
    exibirMensagem("Lista excluída", "erro");
}

// Função para salvar as listas no localStorage
function salvarListas() {
    const cards = document.querySelectorAll(".lista-card");
    const listasSalvas = [];

    cards.forEach((card) => {
        const nome = card.querySelector('input[name="nome_lista"]').value;
        const valores = card.querySelector('textarea[name="lista"]').value;
        listasSalvas.push({ nome, valores });

        // Torna os campos não editáveis após salvar
        const inputs = card.querySelectorAll("input, textarea");
        inputs.forEach((input) => {
            input.readOnly = true;
        });

        // Altera o ícone do botão para "✏️"
        const botaoEdicao = card.querySelector(".edit-button");
        botaoEdicao.textContent = "✏️";
    });

    localStorage.setItem("listasSalvas", JSON.stringify(listasSalvas));
    exibirMensagem("Listas salvas", "sucesso");
}

// Função para carregar as listas salvas ao carregar a página
function carregarListasSalvas() {
    const listasSalvas = JSON.parse(localStorage.getItem("listasSalvas")) || [];
    const container = document.getElementById("lista-container");

    listasSalvas.forEach((lista) => {
        const novoCard = document.createElement("div");
        novoCard.className = "lista-card";
        novoCard.innerHTML = `
            <div class="header">
                <input type="text" name="nome_lista" placeholder="Nome da Lista" value="${lista.nome}" readonly>
                <div class="icons">
                    <button type="button" class="edit-button">✏️</button>
                    <button type="button" class="delete-button">❌</button>
                </div>
            </div>
            <textarea name="lista" placeholder="Insira os elementos separados por vírgula (ex: João, Maria, Pedro)" readonly>${lista.valores}</textarea>
        `;
        container.appendChild(novoCard);

        // Adiciona eventos aos botões dentro do novo card
        const botaoEditar = novoCard.querySelector(".edit-button");
        const botaoExcluir = novoCard.querySelector(".delete-button");

        botaoEditar.addEventListener("click", () => alternarEdicao(botaoEditar));
        botaoExcluir.addEventListener("click", () => excluirLista(botaoExcluir));
    });
}

// Função para calcular a interseção
function calcularIntersecao() {
    const cards = document.querySelectorAll(".lista-card");
    const listas = [];

    cards.forEach((card) => {
        const valores = card.querySelector('textarea[name="lista"]').value;
        if (valores.trim()) {
            const elementos = valores.split(",").map((item) => item.trim());
            listas.push(new Set(elementos));
        }
    });

    if (listas.length < 2) {
        exibirMensagem("Não foi possível calcular. Insira novas listas e atribua valores.", "erro");
        return;
    }

    let interseção = listas[0];
    for (let i = 1; i < listas.length; i++) {
        interseção = new Set([...interseção].filter((x) => listas[i].has(x)));
    }

    if (interseção.size === 0) {
        exibirMensagem("Não há interseção entre as listas.", "erro");
        document.getElementById("resultado").innerText = "";
    } else {
        const resultado = `Resultado: ${Array.from(interseção).join(", ")}`;
        document.getElementById("resultado").innerText = resultado;
    }
}

// Função para calcular a união
function calcularUniao() {
    const cards = document.querySelectorAll(".lista-card");
    const listas = [];

    cards.forEach((card) => {
        const valores = card.querySelector('textarea[name="lista"]').value;
        if (valores.trim()) {
            const elementos = valores.split(",").map((item) => item.trim());
            listas.push(new Set(elementos));
        }
    });

    if (listas.length < 2) {
        exibirMensagem("Não foi possível calcular. Insira novas listas e atribua valores.", "erro");
        return;
    }

    let uniaoTotal = listas[0];
    for (let i = 1; i < listas.length; i++) {
        uniaoTotal = new Set([...uniaoTotal, ...listas[i]]);
    }

    const resultado = `Resultado: ${Array.from(uniaoTotal).join(", ")}`;
    document.getElementById("resultado").innerText = resultado;
}

// Função para exibir o modal do conjunto universo
function exibirModalUniverso() {
    const modal = document.getElementById("modal-universo");
    modal.style.display = "block";
}

// Função para fechar o modal do conjunto universo
function fecharModalUniverso() {
    const modal = document.getElementById("modal-universo");
    modal.style.display = "none";
}

// Função para calcular a Lei de Morgan
function calcularLeiDeMorgan() {
    const cards = document.querySelectorAll(".lista-card");
    const listas = [];

    cards.forEach((card) => {
        const valores = card.querySelector('textarea[name="lista"]').value;
        if (valores.trim()) {
            const elementos = valores.split(",").map((item) => item.trim());
            listas.push(new Set(elementos));
        }
    });

    if (listas.length !== 2) {
        exibirMensagem("Erro: A Lei de Morgan só pode ser aplicada a exatamente duas listas.", "erro");
        return;
    }

    // Exibir o modal para o usuário definir o conjunto universo
    exibirModalUniverso();

    // Configurar o botão de confirmação do modal
    document.getElementById("confirmar-universo").onclick = () => {
        const inputUniverso = document.getElementById("input-universo").value;
        let conjuntoUniverso;

        if (inputUniverso.trim()) {
            // Usar o conjunto universo fornecido pelo usuário
            conjuntoUniverso = new Set(inputUniverso.split(",").map((item) => item.trim()));
        } else {
            // Usar a união das listas como conjunto universo
            conjuntoUniverso = new Set();
            listas.forEach((lista) => {
                lista.forEach((elemento) => conjuntoUniverso.add(elemento));
            });
            exibirMensagem("Conjunto universo não definido. Utilizando a união das listas como universo.", "sucesso");
        }

        // Fechar o modal
        fecharModalUniverso();

        // Calcular a Lei de Morgan
        const A = listas[0];
        const B = listas[1];

        // Passo 1: Calcular a união de A e B
        const uniaoAB = new Set([...A, ...B]);

        // Passo 2: Calcular o complemento da união (A ∪ B)c = U - (A ∪ B)
        const complementoUniao = new Set([...conjuntoUniverso].filter((x) => !uniaoAB.has(x)));

        // Passo 3: Calcular os complementos individuais Ac = U - A e Bc = U - B
        const complementoA = new Set([...conjuntoUniverso].filter((x) => !A.has(x)));
        const complementoB = new Set([...conjuntoUniverso].filter((x) => !B.has(x)));

        // Passo 4: Calcular a interseção dos complementos Ac ∩ Bc
        const intersecaoComplementos = new Set([...complementoA].filter((x) => complementoB.has(x)));

        // Passo 5: Exibir o resultado de forma intuitiva
        const resultadoDiv = document.getElementById("resultado");
        resultadoDiv.innerHTML = `
            <div class="resultado-item">
                <strong>(A ∪ B)c:</strong> ${complementoUniao.size > 0 ? Array.from(complementoUniao).join(", ") : "Nenhum elemento fora da união das listas."}
            </div>
            <div class="resultado-item">
                <strong>Ac ∩ Bc:</strong> ${intersecaoComplementos.size > 0 ? Array.from(intersecaoComplementos).join(", ") : "Nenhum elemento em comum fora das listas."}
            </div>
            <div class="resultado-item">
                <strong>Conjunto universo utilizado:</strong> {${Array.from(conjuntoUniverso).join(", ")}}
            </div>
        `;
        resultadoDiv.style.display = "block";
    };
}

// Função para calcular a distributividade da interseção sobre a união
function calcularDistributividadeInterseccao() {
    const cards = document.querySelectorAll(".lista-card");
    const listas = [];

    cards.forEach((card) => {
        const valores = card.querySelector('textarea[name="lista"]').value;
        if (valores.trim()) {
            const elementos = valores.split(",").map((item) => item.trim());
            listas.push(new Set(elementos));
        }
    });

    if (listas.length !== 3) {
        exibirMensagem("Erro: A distributividade da interseção sobre a união requer exatamente três listas.", "erro");
        return;
    }

    const [A, B, C] = listas;

    // Calcular A ∩ (B ∪ C)
    const uniaoBC = new Set([...B, ...C]);
    const interseccaoAUniaoBC = new Set([...A].filter((x) => uniaoBC.has(x)));

    // Calcular (A ∩ B) ∪ (A ∩ C)
    const interseccaoAB = new Set([...A].filter((x) => B.has(x)));
    const interseccaoAC = new Set([...A].filter((x) => C.has(x)));
    const uniaoInterseccoes = new Set([...interseccaoAB, ...interseccaoAC]);

    // Exibir o resultado
    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = `
        <div class="resultado-item">
            <strong>A ∩ (B ∪ C):</strong> ${interseccaoAUniaoBC.size > 0 ? Array.from(interseccaoAUniaoBC).join(", ") : "Nenhum elemento encontrado."}
        </div>
        <div class="resultado-item">
            <strong>(A ∩ B) ∪ (A ∩ C):</strong> ${uniaoInterseccoes.size > 0 ? Array.from(uniaoInterseccoes).join(", ") : "Nenhum elemento encontrado."}
        </div>
        <div class="resultado-item">
            <strong>Resultado:</strong> ${interseccaoAUniaoBC.size === uniaoInterseccoes.size ? "Lei da Distributividade válida." : "Lei da Distributividade inválida."}
        </div>
    `;
    resultadoDiv.style.display = "block";
}

// Função para calcular a distributividade da união sobre a interseção
function calcularDistributividadeUniao() {
    const cards = document.querySelectorAll(".lista-card");
    const listas = [];

    cards.forEach((card) => {
        const valores = card.querySelector('textarea[name="lista"]').value;
        if (valores.trim()) {
            const elementos = valores.split(",").map((item) => item.trim());
            listas.push(new Set(elementos));
        }
    });

    if (listas.length !== 3) {
        exibirMensagem("Erro: A distributividade da união sobre a interseção requer exatamente três listas.", "erro");
        return;
    }

    const [A, B, C] = listas;

    // Calcular A ∪ (B ∩ C)
    const interseccaoBC = new Set([...B].filter((x) => C.has(x)));
    const uniaoAInterseccaoBC = new Set([...A, ...interseccaoBC]);

    // Calcular (A ∪ B) ∩ (A ∪ C)
    const uniaoAB = new Set([...A, ...B]);
    const uniaoAC = new Set([...A, ...C]);
    const interseccaoUnioes = new Set([...uniaoAB].filter((x) => uniaoAC.has(x)));

    // Exibir o resultado
    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = `
        <div class="resultado-item">
            <strong>A ∪ (B ∩ C):</strong> ${uniaoAInterseccaoBC.size > 0 ? Array.from(uniaoAInterseccaoBC).join(", ") : "Nenhum elemento encontrado."}
        </div>
        <div class="resultado-item">
            <strong>(A ∪ B) ∩ (A ∪ C):</strong> ${interseccaoUnioes.size > 0 ? Array.from(interseccaoUnioes).join(", ") : "Nenhum elemento encontrado."}
        </div>
        <div class="resultado-item">
            <strong>Resultado:</strong> ${uniaoAInterseccaoBC.size === interseccaoUnioes.size ? "Lei da Distributividade válida." : "Lei da Distributividade inválida."}
        </div>
    `;
    resultadoDiv.style.display = "block";
}

// Função para resetar tudo
function resetarTudo() {
    document.getElementById("resultado").innerText = "";
    const container = document.getElementById("lista-container");
    container.innerHTML = "";
    localStorage.removeItem("listasSalvas");
    exibirMensagem("Tudo foi resetado com sucesso!", "sucesso");
}

// Event Listeners
document.getElementById("adicionar-lista").addEventListener("click", adicionarLista);
document.getElementById("salvar-listas").addEventListener("click", salvarListas);
document.getElementById("resetar-tudo").addEventListener("click", resetarTudo);
document.getElementById("calcular-intersecao").addEventListener("click", calcularIntersecao);
document.getElementById("calcular-uniao").addEventListener("click", calcularUniao);
document.getElementById("calcular-lei-de-morgan").addEventListener("click", calcularLeiDeMorgan);
document.getElementById("calcular-distributividade-interseccao").addEventListener("click", calcularDistributividadeInterseccao);
document.getElementById("calcular-distributividade-uniao").addEventListener("click", calcularDistributividadeUniao);

// Fechar o modal ao clicar no "X"
document.querySelector(".fechar-modal").addEventListener("click", fecharModalUniverso);

// Fechar o modal ao clicar fora dele
window.addEventListener("click", (event) => {
    const modal = document.getElementById("modal-universo");
    if (event.target === modal) {
        fecharModalUniverso();
    }
});

// Carrega as listas salvas ao carregar a página
document.addEventListener("DOMContentLoaded", carregarListasSalvas);

// Evita que o dropdown feche ao clicar nos botões internos
document.querySelectorAll(".dropdown-conteudo button").forEach((botao) => {
    botao.addEventListener("click", (event) => {
        event.stopPropagation(); // Impede que o clique se propague para o dropdown
    });
});