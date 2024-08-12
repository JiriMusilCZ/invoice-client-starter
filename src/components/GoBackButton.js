

const GoBackButton = () => {
    const handleGoBack = () => {
        window.history.back();
    };

    return (
        <button className="btn btn-success" onClick={handleGoBack}>
            Zpět
        </button>
    );
};

export default GoBackButton;
