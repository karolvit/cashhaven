const authMiddleware = () => (next) => (action) => {
  if (action.payload && typeof action.payload === "string") {
    if (action.payload.includes("Token inválido ou expirado")) {
      alert("Sua sessão expirou. Recarregando a página...");
      window.location.reload();
    }
  }
  return next(action);
};

export default authMiddleware;
