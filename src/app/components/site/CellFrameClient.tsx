/* Shared by server and client components: no server-only imports here. */

/** Excel selection frame shown on hover/focus: drawn border, fill handle and cell address. */
export function CellFrame({ addr }: { addr: string }) {
  return (
    <>
      <span className="xsel" aria-hidden="true" />
      <span className="xsel-handle" aria-hidden="true" />
      <span className="xsel-addr" aria-hidden="true">
        {addr}
      </span>
    </>
  );
}

/** Spreadsheet address for the n-th card in a grid with `cols` columns. */
export const cellAddr = (index: number, cols = 3) => `${"ABCDEF"[index % cols]}${Math.floor(index / cols) + 1}`;
