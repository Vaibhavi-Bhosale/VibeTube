import Container from "./Container"
function Wait({msg}) {
  return (
     <Container>
         <div className="flex items-center justify-center h-screen">
              
              <p className="text-white text-xl font-semibold animate-pulse">{msg}</p>
         </div>     
     </Container>
  )
}

export default Wait
