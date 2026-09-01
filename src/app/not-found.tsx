import Link from 'next/link'

export default function NotFound() {
  return <main className="not-found-page"><div><span>404 / FUERA DE RUTA</span><h1>Esta página no forma parte del sistema.</h1><p>Puede que el enlace haya cambiado o que la dirección no sea correcta.</p><Link href="/">Volver a MOMENTUNDIGITAL <b>↗</b></Link></div></main>
}
