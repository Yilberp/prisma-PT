import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { list } from '../../services/transaction.service';
export default function Transactions(){
    const userState = useSelector((store) => store.user);
    const [data,setData] = useState([])
    useEffect(()=>{
        (async()=>{
            const result = await list(userState.username)
            setData(result)
        })();
    },[])
    return(
        <main className="row">
            <aside className="col-3  col-lg-3 min-vh-100 bg-light p-5">
                <div className='mb-4 text-center'>
                    <h1 className='mb-0 font-prisma font-prisma-bold lh-1'>PRISMA</h1>
                    <p className='mb-0 font-prisma font-prisma-thin letter-spacing'>DIGITAL</p>
                </div>
                <ul className="m-0 p-0">
                    <li className="mb-2">
                        <button className='btn btn-primary text-white w-100'><FontAwesomeIcon icon={faAdd}/> Registrar movimiento</button>
                    </li>
                    <li className=''>
                        <button className='btn btn-primary text-white w-100'>Cerrar sesion</button>
                    </li>
                </ul>
            </aside>
            <section className="col-9  col-lg-9 p-4">
                <h4>Movimientos</h4>
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Detalle</th>
                        <th scope="col">Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((item) => (
                                <tr key={item.id}>
                                <th scope='row'>{item.id}</th>
                                <td>{new Date(item.date_bill).toLocaleDateString()}</td>
                                <td>{item.observation}</td>
                                <td>{item.value}</td>
                            </tr>
                            )
                               
                            )
                        }
                    </tbody>
                </table>
            </section>
        </main>
    )
}