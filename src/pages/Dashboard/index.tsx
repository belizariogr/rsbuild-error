import { ChangeEvent, useCallback, useRef, useState } from 'react';
import Page from '../../core/components/layout/DefaultPage';
import { TextField } from '@material-ui/core';
import Utils from '../../core/services/Utils';


export const Dashboard = () => {

    const [restante, setRestante] = useState<any[]>(() => []);
    const inputBarCode = useRef<HTMLInputElement>(null);
    const [errorHelper, setErrorHelper] = useState('');
    const [embalagens, setEmbalagens] = useState<any[]>(() => []);
    const [expanded, setExpanded] = useState(-1);
    const embRef = useRef<HTMLDivElement>(null);
    const [refreshCount, setRefreshCount] = useState(0);
    const [usarEmbalagens, setUsarEmbalagens] = useState(() => false);
    const [hasNegatives, setHasNegatives] = useState(false);
    const [textValue, setText] = useState(() => {
        return '';
    });

    const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
        setText(evt.target.value)
    }

    const focusInput = () => {
        inputBarCode.current?.focus();
    }

    const findItem = () => {
        // eslint-disable-next-line prefer-const
        let { barcode, quantFound, quant } = {barcode: '123', quantFound: true, quant: 1};

        const code = Utils.getNumber(barcode);
        const startWithHash = barcode.startsWith('#');
        let idx = -1;
        if (!startWithHash) {
            if (barcode.length >= 36) {
                const barcodeInfo = {id: '1', quantity: 1};
                let updateQuant = false;
                if (!quantFound) {
                    quantFound = true;
                    quant = barcodeInfo.quantity;
                    updateQuant = true;
                }

                idx = restante.findIndex(r => {
                    if (true) {
                        const lst: string[] = (r.CodigoBarras || '').split(';');
                        const cod = lst.findIndex(b => b === barcodeInfo.id);
                        return cod !== -1
                    }
                    return (r.CodigoBarras === barcodeInfo.id)
                });
                if (updateQuant && idx !== -1 && restante[idx].DecimaisCodBarras)
                    quant = Utils.fixFloat(quant / Math.pow(10, restante[idx].DecimaisCodBarras), restante[idx].DecimaisCodBarras);
                if (updateQuant && idx !== -1 && restante[idx].SeparacaoPeso && restante[idx].ConversaoPeso)
                    quant = Utils.fixFloat(quant * restante[idx].ConversaoPeso, 5)
            }
            else
                idx = restante.findIndex(r => {
                    if (true) {
                        const lst: string[] = (r.CodigoBarras || '').split(';');
                        const cod = lst.findIndex(b => b === barcode);
                        return cod !== -1
                    }
                    return r.CodigoBarras === barcode
                });
        }
        if (idx === -1)
            idx = restante.findIndex(r => r.ProdutoId === Number(code));
        if (idx === -1) {
            setErrorHelper('Item não encontrado.');
            throw new Error()
        }

        const it = restante[idx];
        if (it.SeparacaoPeso && !quantFound) {

            setErrorHelper('Quantidade inválida.');
            throw new Error()
        }
        return { it, quant, idx };
    }

    const processaCodigoBarras = () => {
        try {
            const item = findItem();
            let quant = item.quant;
            const { it, idx } = item;

            if (it.ControleLote && !it.Lote) {
                setErrorHelper('Lote desse item não foi informado.');
                throw new Error();
            }
            let newIt;
            if (!it.SeparacaoPeso) {
                if (it.Quantidade < quant) {
                    if (it.Quantidade < 1 && it.Quantidade > 0 && quant === 1)
                        quant = it.Quantidade;
                    else {
                        setErrorHelper('Quantidade informada é maior que o restante.');
                        throw new Error();
                    }
                }
                newIt = embalagens[expanded].Itens.find((item: any) => item.ProdutoId === it.ProdutoId && (item.Lote || '') === (it.Lote || ''));
            }
            if (!newIt) {
                newIt = {
                    ProdutoId: it.ProdutoId,
                    Descricao: it.Descricao,
                    Unidade: it.Unidade,
                    Lote: it.Lote,
                    Validade: it.Validade,
                    UnidadeTrib: it.UnidadeTrib || 'un',
                    QuantidadePacote: it.QuantidadePacote,
                    Quantidade: 0,
                };
                embalagens[expanded].Itens.push(newIt);
                setTimeout(() => {
                    embRef.current?.scroll({ left: 0, top: embRef.current?.clientHeight || 0, behavior: 'smooth' });
                }, 100);
            }
            if (it.SeparacaoPeso) {
                newIt.Quantidade = 1;
                newIt.QuantidadeTrib = Utils.fixFloat(quant);
            } else {
                newIt.Quantidade = Utils.fixFloat(newIt.Quantidade + quant);
                it.Quantidade = Utils.fixFloat(Number(it.Quantidade) - quant);
            }

            if (it.Quantidade === 0)
                restante.splice(idx, 1);
            recalculaRestante({}, embalagens);
            setRefreshCount(v => v + 1);
        } catch (err) {
            //
        }
    };

    const recalculaRestante = useCallback((pedido: any, embalArr: any[]) => {
        if (!pedido || !pedido.Itens || !embalArr)
            return;
        const rest = Utils.cloneArr(pedido.Itens);

        for (let e = 0; e < embalArr.length; e++) {
            const emb = embalArr[e];

            for (let i = 0; i < emb.Itens.length; i++) {
                const sepIt = emb.Itens[i];
                const idx = rest.findIndex((item: any) => item.ProdutoId === sepIt.ProdutoId && (item.Lote || '') === (sepIt.Lote || ''));
                const it = rest[idx];

                if (it) {
                    sepIt.UnidadeTrib = it.UnidadeTrib || it.UnidadeItem || 'un';
                    it.Quantidade = Utils.fixFloat(it.Quantidade - sepIt.Quantidade);
                    if (!sepIt.Descricao)
                        sepIt.Descricao = it.Descricao;

                    if (it.Quantidade === 0)
                        rest.splice(idx, 1);
                } else {
                    embalArr.length = 0;
                    if (!usarEmbalagens) {
                        embalArr.push({ EmbalagemId: -1, Itens: [] })
                    }
                    recalculaRestante(pedido, embalArr);
                    return;
                }
            }
        }
        setRestante(rest);

        const neg = rest.filter(it => it.Quantidade < 0);
        setHasNegatives(neg.length > 0);
    }, [usarEmbalagens])


    return (
        <Page title={'Visão Geral'} titleContent={'test'} breakxs>

            <TextField
                value={textValue}
                onChange={handleChange}
                inputRef={inputBarCode}
                variant='outlined'
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        console.log('Cant debug here...')
                        e.preventDefault();
                        e.stopPropagation();
                        processaCodigoBarras();
                    }
                }}
            />
        </Page>
    )
}


export default Dashboard;

