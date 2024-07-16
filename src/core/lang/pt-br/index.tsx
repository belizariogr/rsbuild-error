import { ptBR as locale } from 'date-fns/locale';
import { ReactComponent as Icon } from './icon.svg';
import { Lang } from '../../services/Lang/types';
import PhoneCodes from './phonecodes';

const pt_br: Lang = {
    name: "Português (Brasil)",
    code: "pt-br",
    countries: [1058],
    locale,
    icon: <Icon />,
    phoneCodes: PhoneCodes,
    data: {
        localeCode: "pt-BR",
        languageCode: "pt",
        dialCode: "55",
        masks: {
            date: "99/99/9999",
            time: "99:99:99",
            datetime: "99/99/9999 99:99",
            phone: "9999-9999;99999-9999;(99) 9999-9999;(99) 99999-9999",
            zip: "99999-999",
            cpfcnpj: "999.999.999-99;99.999.999/9999-99",
        },
        formats: {
            date: "dd/MM/yyyy",
            time: "HH:mm:ss",
            shortTime: "HH:mm",
            datetime: "dd/MM/yyyy HH:mm",
            fullDatetime: "EE, dd \\de MMM \\de yyyy",
            dateSperator: "/",
            timeSeparator: ":",
            decimalSeparator: ",",
            thousandSeparator: ".",
            show24Hour: true,
            monthOfYear: "MMMM de YYYY",

            true: "Sim",
            false: "Não",
        },
        dates: {
            months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
            monthsShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
            days: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
            today: "Hoje"
        },
        captions: {

            myAccount: 'Minha Conta',
            settings: 'Configurações',
            darkMode: 'Modo Escuro',
            lightMode: 'Modo Claro',
            langs: 'Idioma',
            logout: 'Sair',
            notifications: 'Notificações',
            noNotifications: 'Você não possui notificações.',

            confirmation: 'Confirmação',
            information: 'Informação',
            warning: 'Aviso',
            error: 'Erro',

            ok: 'Ok',
            yes: 'Sim',
            no: 'Não',
            cancel: 'Cancelar',
            close: 'Fechar',
            clear: 'Limpar',
            new: 'Novo',
            femNew: 'Nova',
            edit: 'Editar',
            editing: 'Editando',
            viewing: 'Visualizando',
            delete: 'Excluir',
            save: 'Salvar',
            tryAgain: 'Tente Novamente',
            apply: 'Aplicar',
            or: 'ou',
            and: 'e',
            to: 'até',
            add: 'Adicionar',
            all: 'Todos',
            with: 'Com',

            page: 'Página',
            noRecordsFound: 'Nenhum registro encontrado.',
            recordsPerPage: 'Registros por página:',

            noOptions: 'Nenhuma opção',
            noOptionsSearch: 'Digite para pesquisar',
            searching: 'Pesquisando...',
            searchBox: 'Pesquisar',

            filterHeader: 'Filtros',
            filter: 'Filtrar',
            noOptionsAvailable: 'Nenhuma opção disponível.',
            // cleanFilters: 'Limpar Filtros',

            startDate: 'Data Inicial',
            endDate: 'Data Final',
            today: 'Hoje',

            themeHeader: 'Selecione um tema',
            langHeader: 'Selecione o seu idioma',

            enterAccount: 'Entre com sua conta:',
            proceed: 'Continuar',
            dontKnowMyAccount: 'Não sei o nome da minha conta',

            createAccount: 'Criando uma conta',
            accountName: 'Nome da Conta',
            company: 'Nome da Empresa',
            email: 'Email',
            user: 'Nome de Usuário',
            name: 'Seu Nome Completo',
            createAccButton: 'Criar Conta',

            accessAccount: 'Você está acessando a conta:',
            recoverAccount: 'Recuperando uma senha:',
            username: 'Usuário ou e-mail',
            password: 'Senha',
            passwordConfirmation: 'Confirmação da senha',
            remember: 'Lembrar-me nesse dispositivo',
            login: 'Entrar',
            recover: 'Recuperar Senha',
            forgotPassword: 'Eu esqueci minha senha',
            register: 'Crie uma conta',
            changeAccount: 'Mudar de conta',

            importImageButton: 'Selecione uma imagem',
            importImageLabel: 'Arraste e solte aqui as imagens para envio',

            arrangeFields: 'Organizar Campos',
            resetToDefault: 'Voltar ao Padrão',
            arrange: 'Organizar',

            print: 'Imprimir',
            printList: 'Imprimir lista',
            exportList: 'Exportar lista',

            more: 'mais',
            less: 'menos',
            equalsLastPeriod: 'igual ao período anterior',
            days: 'dia(s)',
            phone: 'Telefone',

            update: 'Atualizar',
            dismiss: 'Ignorar',

            featuredText: 'Destaque',
            promotionText: 'Promoção',

            bringFront: 'Trazer para frente',
            sendBack: 'Enviar para trás',
            copy: 'Copiar',
            paste: 'Colar',

            sendEmail: 'Envar Email',

        },
        messages: {
            invalidUserPassword: 'Usuário ou senha inválida.',
            accountSuspended: 'Sua conta está suspensa. Entre em contato com o suporte.',
            accountNotFound: 'Conta não encontrada.',
            errorCheckingAccount: 'Não foi possível acessar sua conta. Tente novamente mais tarde.',
            errorLogin: 'Não foi possível efetuar o login. Tente novamente mais tarde.',

            newVersion: 'Existe uma nova versão.',
            gridErrorHeader: 'Vish! Houve algum problema.',
            gridErrorText: 'Verifique sua conexão com a internet.',
            gridNotFoundHeader: 'Nenhum registro encontrado.',
            gridNotFoundText: 'Você pode também adicionar um novo registro clicando no botão "NOVO".',
            noRecordsSelected: 'Nenhum registro foi selecionado.',
            cancelRecord: 'Você tem certeza que deseja cancelar?',
            deleteMsg: 'Você tem certeza que deseja excluir o(s) registro(s) selecionado(s)?',
            deleteItem: 'Você tem certeza que deseja excluir esse item?',
            deleteSuccessMsg: '%s registros excluído(s).',
            deleteErrorMsg: 'Erro ao excluir registros. Tente novamente mais tarde.',
            singleDeleteMsg: 'Só é possível excluir 1 registro por vêz nesse módulo.',
            requiredField: 'Campo obrigatório.',
            saveSuccessMsg: 'Salvo com sucesso.',
            saveValidationError: 'Preencha todos os campos obrigatórios antes de salvar.',
            saveErrorMsg: 'Erro ao salvar registro. Tente novamente mais tarde.',

            recoverSuccess: 'A nova senha foi enviado para o email do usuário.',
            recoverError: 'Não foi possível recuperar a senha para esse usuário.',

            registrationError: 'Não foi possível cadastrar sua conta. Tente novamente mais tarde.',
            accountExistsError: 'A conta informada já existe.',

            fieldTooSmall: 'Valor é muito curto.',
            fieldTooLong: 'Valor é muito longo.',
            invalidFieldValue: 'Valor inválido.',
            invalidDateFilter: 'Período inválido.',
            invalidEmail: 'Email inválido',
            canContainsLettersNumbers: 'O campo só pode conter letras e números.',
            passwordConfirmationDoesntMatch: 'A senha não confere.',

            uploadImageDeleteConfirmation: 'Tem certeza que deseja excluir?',
            uploadImageError: 'Erro ao enviar imagem.',
            uploadImageTypesWarning: 'Somente arquivos de imagens (%s) são aceitos.',
            uploadImageLimitWarning: 'Você pode enviar %s imagem(s).',
            uploadImageSizeWarning: 'O tamanho máximo da imagem é %s MB.',
            uploadImageMaxDimensionsWarning: 'As dimensões máximas da imagem são %s.',
            uploadImageMinDimensionsWarning: 'As dimensões mínimas da imagem são %s.',

            noItems: 'Nenhum item informado.',
            duplicatedItems: 'Existem itens duplicados.',
            noOptions: 'Nenhuma opção',

            errorGettingData: 'Erro ao receber dados do servidor. Tente novamente mais tarde.',

            emailSent: 'Email enviado.',
            errorSendingEmail: 'Erro ao enviar email. Verifique o endereço de email e tente novamente.',

        },
        coreModules: {
            dashboard: {
                name: "Visão Geral"
            },
        }
    },
    modules: {}
}

export default pt_br;