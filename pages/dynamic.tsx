/** Add your relevant code here for the issue to reproduce */
export default function Home() {
  return <><h1>Dynamic route</h1><h2>(route that implements getServerSideProps)</h2></>
}

export async function getServerSideProps() {
  
  return {
    props: {}, // will be passed to the page component as props
  }
}