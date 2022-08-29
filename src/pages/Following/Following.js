import Portal from '~/components/Portal';

function Following() {
  return (
    <div>
      <h2>Following Page</h2>
      <Portal containerId={'following'}>
        <button>Following</button>
      </Portal>
    </div>
  );
}

export default Following;
