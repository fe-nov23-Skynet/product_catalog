import './cartButton.scss';

interface Props {
  onClick: (...args: any[]) => void
  active: boolean,
}

export function CartButton({
  onClick,
  active,
}: Props) {
  return (
    <div>
      {!active ? (
        <button
          onClick={onClick}
          className="button-submit"
        >
          Add to cart
        </button>
      ) : (
        <button
          className="button-submited"
          onClick={onClick}
        >
          Added to cart
        </button>
      )}
    </div>
  );
}
