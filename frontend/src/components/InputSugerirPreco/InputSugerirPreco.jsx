import React, { useState } from 'react';
import CurrencyInput from 'react-currency-input-field';
import styles from './InputSugerirPreco.module.css';
import { FaRegQuestionCircle } from 'react-icons/fa';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const InputSugerirPreco = ({ userId }) => {
  const [showModal, setShowModal] = useState(true);
  const [sugestoes, setSugestoes] = useState({
    Etanol: '',
    GasolinaC: '',
    GasolinaADT: '',
    DieselS10: '',
    DieselS500: '',
    GNV: '',
  });

  const notifyError = (message) => {
    toast.error(message, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const notifySuccess = (message) => {
    toast.success(message, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleInputChange = (combustivel, value) => {
    setSugestoes((prevSugestoes) => ({
      ...prevSugestoes,
      [combustivel]: value,
    }));
  };

  const handleSalvarAlteracoes = () => {
    const sugestoesParaBackend = Object.fromEntries(
      Object.entries(sugestoes).map(([combustivel, valor]) => [
        combustivel,
        valor === undefined || valor === null || valor.trim() === '' ? null : valor,
      ])
    );

    const peloMenosUmPreenchido = Object.values(sugestoesParaBackend).some(
      (valor) => valor !== null && valor !== ''
    );

    if (!peloMenosUmPreenchido) {
      notifyError('Pelo menos um dos campos deve ser preenchido.');
      return;
    }

    const sugestaoInvalida = Object.entries(sugestoesParaBackend).some(
      ([combustivel, valor]) =>
        valor !== null &&
        valor !== '' &&
        (isNaN(parseFloat(valor.replace(/,/g, ''))) || parseFloat(valor.replace(/,/g, '')) > 1500)
    );

    if (sugestaoInvalida) {
      notifyError('Sugestão inválida: O valor deve ser entre R$ 2,00 a R$ 15,00 reais.');
      return;
    }

    const sugestaoAbaixoDoMinimo = Object.entries(sugestoesParaBackend).some(
      ([combustivel, valor]) =>
        valor !== null &&
        valor !== '' &&
        (isNaN(parseFloat(valor.replace(/,/g, ''))) || parseFloat(valor.replace(/,/g, '')) < 200)
    );

    if (sugestaoAbaixoDoMinimo) {
      notifyError('Sugestão inválida: O valor deve ser entre R$ 2,00 a R$ 15,00 reais.');
      return;
    }

    setSugestoes({
      Etanol: '',
      GasolinaC: '',
      GasolinaADT: '',
      DieselS10: '',
      DieselS5: '',
      GNV: '',
    });

    notifySuccess('Sugestões enviadas com sucesso!');
    console.log('Sugestões enviadas:', sugestoesParaBackend);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <div className={styles.inputSugerirPreco}>
          <div className={styles.iconFechar} onClick={handleCloseModal}>
            <IoCloseCircleOutline className={styles.icones} />
          </div>
          <div className={styles.divTitulo}>
          <FaRegQuestionCircle className={`${styles.icones} ${styles.questionIcon}`} title="Insira um valor entre R$2,00 a R$15,00" />
          <h3>Sugerir Preço</h3>
          </div>
          
          <div className={styles.inputsContainer}>
            {Object.keys(sugestoes).map((combustivel) => (
              <div key={combustivel} className={styles.inputItem}>
                <div className={styles.divLabel}>
                  <label>{combustivel}</label>
                </div>
                <div className={styles.divInput}>
                <CurrencyInput
                  placeholder="0,00"
                  value={sugestoes[combustivel]}
                  onValueChange={(value) => handleInputChange(combustivel, value)}
                  allowDecimals
                  decimalScale={2}
                  prefix="R$ "
                />
                </div>
              </div>
            ))}
          </div>
          <button className={styles.btnSalvar} onClick={handleSalvarAlteracoes}>Salvar Alterações</button>
        </div>
      )}
    </>
  );
};

export default InputSugerirPreco;
