export default function Toast({children}: {children: React.ReactNode}){
    return <div className="fixed top-8 right-8 z-40">
        {children}
    </div>
}
