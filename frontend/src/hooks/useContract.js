import { ethers } from "ethers";
import JavaScriptQuiz from "../contracts/JavaScriptQuiz.json";
import { useLoadingStore } from "../stores/loadingStore.js";
import { useContractStore } from "../stores/contractStore.js";
import { useAccountStore } from "../stores/accountStore.js";

const useContract = () => {
  const setIsLoading = useLoadingStore((state) => state.setIsLoading);
  const contract = useContractStore((state) => state.contract);
  const setContract = useContractStore((state) => state.setContract);
  const accounts = useAccountStore((state) => state.accounts);
  const setAccounts = useAccountStore((state) => state.setAccounts);

  console.log("Accounts", accounts);
  const handleLogin = async () => {
    // On se connecte au wallet de l'utilisateur
    const contractAddress = "0xf3BE183D1F476F86Cb788C06267dE622Aecb7C64";
    const contractABI = JavaScriptQuiz.abi;

    try {
      // On se connecte au wallet de l'utilisateur
      setIsLoading(true);

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccounts(accounts);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      setContract(contract);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  const loadQuestions = async () => {
    try {
      const loadedQuestions = await contract.getQuizzes();
      return loadedQuestions;
    } catch (error) {
      console.error("Error loading questions:", error);
      throw error;
    }
  };

  const submitAnswers = async (answers) => {
    try {
      setIsLoading(true);
      await contract.answerQuiz(answers);
    } catch (error) {
      console.error("Error submitting answers:", error);
      throw error;
    }
  };

  return { handleLogin, contract, loadQuestions, submitAnswers };
};

export default useContract;
