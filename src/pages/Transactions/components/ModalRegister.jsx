import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label } from 'reactstrap';
export default function ModalRegister({ modal, toggle, onSubmit, dataBill, setDataBill, isCreate }) {
    const handleData = (e)=>{
        const {name, value} = e.target
        setDataBill({...dataBill, [name]:value})
    }
    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>
                {isCreate ? "Registro de Movimiento" : "Ver Movimiento"}
                </ModalHeader>
            <ModalBody>
                <div className="w-100">
                    <label>Descripcion</label>
                    <Input name='observation' type="textarea" onChange={handleData} />
                </div>
                <label>Tipo de Movimiento</label>
                <div className="w-100 d-flex">

                    <FormGroup check>
                        <Input
                            name="type"
                            value={"1"}
                            type="radio"
                        />
                        
                        <Label check className='me-4'>
                            Ingreso
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Input
                            name="type"
                            value={"2"}
                            type="radio"
                        />
                       
                        <Label check>
                            Gasto
                        </Label>
                    </FormGroup>
                </div>
                <FormGroup >
                    <Label >
                        Valor
                    </Label>
                    <Input
                        name="value"
                        type="text"
                        onChange={handleData}
                    />
               

                </FormGroup>
            </ModalBody>
            <ModalFooter style={{display:"flex", justifyContent: "center", gap:"1rem"}}>
                <Button color="primary" onClick={onSubmit}>
                   Registrar
                </Button>
                <Button color="transparent" onClick={toggle}>
                    Cancelar
                </Button>
            </ModalFooter>
        </Modal>
    )
}