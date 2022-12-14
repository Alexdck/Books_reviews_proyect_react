import axios from "axios"
import React from "react"
import {
    MDBCol,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBTypography,
    MDBBtn
} from 'mdb-react-ui-kit'
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { userData } from "../../containers/User/userSlice"
import { Icon } from '@iconify/react'
import './BookCard.scss'
import { useState } from "react"

const BookCard = props => {

    let navigate = useNavigate()

    const identification = useSelector(userData)

    const deleteId = props.data.id

    const [deleteDataState, setDeleteDataState] = useState({})

    let requirements = {
        headers: {
            "Authorization": `Bearer ${identification.token}`
        }
    }

    //Only the SuperAdmin/Admin can delete a book

    const handleDeleteBook = async () => {
        try {
            await axios.delete(`https://bookapi.up.railway.app/api/book/deleteBook/${deleteId}`, requirements)

            if (!deleteDataState.isError) {

                setDeleteDataState({
                    isError: false,
                    message: `El libro ${props.data.title} ha sido eliminado`
                })
                setTimeout(() => {
                    navigate("/newBook")

                }, 1000)

            } else {
                setDeleteDataState({
                    isError: true,
                    message: `Ha habido un error eliminando el libro`
                })
            }
        } catch (error) {

            setDeleteDataState({
                isError: true,
                message: `Ha habido un error eliminando el libro`
            })
        }
    }

    if (identification.infoData) {

        if (identification.infoData.id === 1) {

            return (
                <MDBCard
                    fluid
                    className="mb-10 mainBookCard"
                    style={{ borderRadius: '.5em' }}
                >
                    <MDBRow className="g-0">
                        <MDBCol
                            md="3"
                            className="gradient-custom text-center text-white bookColData"
                            style={{ borderTopLeftRadius: '.5em', borderBottomLeftRadius: '.5em' }}
                        >
                            <MDBCardImage
                                src={props.data.book_cover}
                                alt="Avatar"
                                className="my-5 bookCardImg"
                                style={{ width: '12em' }}
                                fluid
                            />
                            <hr className="mt-0 mb-3" />
                            <br />
                            <MDBTypography tag="h5">{props.data.title}</MDBTypography>
                            <br />
                            <hr className="mt-0 mb-6" />
                            <br />
                            <MDBBtn
                                className='mx-2 bookCardBtn'
                                color='dark'
                                onClick={() => navigate(`/reviews/${props.data.id}`)}
                            >
                                Ver rese??as
                            </MDBBtn>
                            <br /><br />
                            <hr className="mt-0 mb-3" />
                            <br />
                            <MDBBtn
                                className='mx-2 bookCardBtn'
                                color='dark'
                                onClick={() => navigate(`/newReview/${props.data.id}`)}
                            >
                                A??adir rese??a
                            </MDBBtn>
                            <br /><br />
                        </MDBCol>
                        <MDBCol md="9">
                            <MDBCardBody className="p-4">
                                <br />
                                <MDBTypography className='dataHead' tag="h6">
                                    Informaci??n
                                </MDBTypography>
                                <br />
                                <hr className="mt-0 mb-4 bodyHr" />
                                <MDBRow className="pt-1">

                                    <MDBCol size="6" className="mb-3">
                                        <MDBTypography tag="h5">Autor</MDBTypography>
                                        <MDBCardText className="text-muted">
                                            {props.data.author}
                                        </MDBCardText>
                                    </MDBCol>
                                    <MDBCol size="6" className="mb-3">
                                        <MDBTypography tag="h5">Saga</MDBTypography>
                                        <MDBCardText className="text-muted">
                                            {props.data.series}
                                        </MDBCardText>
                                    </MDBCol>
                                    <MDBCol size="6" className="mb-3">
                                        <MDBTypography tag="h5">G??nero</MDBTypography>
                                        <MDBCardText className="text-muted">
                                            {props.data.genre}
                                        </MDBCardText>
                                    </MDBCol>
                                    <MDBCol size="6" className="mb-3">
                                        <MDBTypography tag="h5">Fecha de publicaci??n</MDBTypography>
                                        <MDBCardText className="text-muted">
                                            {props.data.year}
                                        </MDBCardText>

                                    </MDBCol>
                                    <hr className="mt-0 mb-4 bodyHr" />
                                    <MDBCol size="6" className="mb-3">
                                        <a
                                            tag='a'
                                            href={props.data.author_wiki_url}
                                            target="_blank"
                                        >
                                            <Icon className="Icons" icon="mdi:wikipedia" />
                                        </a>
                                        <p>Wikipedia del autor</p>
                                    </MDBCol>
                                    <MDBCol size="6" className="mb-3">
                                        <a
                                            tag='a'
                                            href={props.data.shop_url}
                                            target="_blank"
                                        >
                                            <Icon className="Icons" icon="ri:amazon-fill"></Icon>
                                        </a>
                                        <p>C??mpralo</p>
                                    </MDBCol>
                                </MDBRow>
                                <br />
                                <MDBTypography className='dataHead' tag="h6">
                                    Sinopsis
                                </MDBTypography>
                                <br />
                                <hr className="mt-0 mb-4 bodyHr" />

                                <MDBRow className="pt-1">
                                    <MDBCol size="12" className="mb-3">
                                        <MDBCardText className="text-muted">
                                            {props.data.synopsis}
                                        </MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCol>
                    </MDBRow>
                    <div className='newBookMessage'>
                        {
                            deleteDataState.isError ?
                                (<p style={{ color: "red" }}>{deleteDataState.message}</p>)
                                :
                                (<p style={{ color: "green" }}>{deleteDataState.message}</p>)
                        }
                    </div>
                    <MDBBtn
                        className='mx-2 bookCardBtn2'
                        color='dark'
                        onClick={() => navigate(`/editBook/${props.data.id}`)}
                    >
                        Editar libro
                    </MDBBtn>
                    <MDBBtn
                        className='mx-2 bookCardBtn3'
                        color='dark'
                        onClick={handleDeleteBook}
                    >
                        Eliminar libro
                    </MDBBtn>
                </MDBCard>
            )
        } else {

            return (
                <MDBCard className="mb-10 mainBookCard" style={{ borderRadius: '.5em' }}>
                    <MDBRow className="g-0">
                        <MDBCol
                            md="3"
                            className="gradient-custom text-center text-white bookColData"
                            style={{ borderTopLeftRadius: '.5em', borderBottomLeftRadius: '.5em' }}
                        >
                            <MDBCardImage
                                src={props.data.book_cover}
                                alt="Avatar"
                                className="my-5 bookCardImg"
                                style={{ width: '12em' }}
                                fluid
                            />
                            <hr className="mt-0 mb-3" />
                            <br />
                            <MDBTypography tag="h5">{props.data.title}</MDBTypography>
                            <br />
                            <hr className="mt-0 mb-6" />
                            <br />
                            <MDBBtn
                                className='mx-2 bookCardBtn'
                                color='dark'
                                onClick={() => navigate(`/reviews/${props.data.id}`)}
                            >
                                Ver rese??as
                            </MDBBtn>
                            <br /><br />
                            <hr className="mt-0 mb-3" />
                            <br />
                            <MDBBtn
                                className='mx-2 bookCardBtn'
                                color='dark'
                                onClick={() => navigate(`/newReview/${props.data.id}`)}
                            >
                                A??adir rese??a
                            </MDBBtn>
                            <br /><br />
                        </MDBCol>
                        <MDBCol md="9">
                            <MDBCardBody className="p-4">
                                <br />
                                <MDBTypography className='dataHead' tag="h6">
                                    Informaci??n
                                </MDBTypography>
                                <br />
                                <hr className="mt-0 mb-4 bodyHr" />
                                <MDBRow className="pt-1">
                                    <MDBCol size="6" className="mb-3">
                                        <MDBTypography tag="h5">Autor</MDBTypography>
                                        <MDBCardText className="text-muted">
                                            {props.data.author}
                                        </MDBCardText>
                                    </MDBCol>
                                    <MDBCol size="6" className="mb-3">
                                        <MDBTypography tag="h5">Saga</MDBTypography>
                                        <MDBCardText className="text-muted">
                                            {props.data.series}
                                        </MDBCardText>
                                    </MDBCol>
                                    <MDBCol size="6" className="mb-3">
                                        <MDBTypography tag="h5">G??nero</MDBTypography>
                                        <MDBCardText className="text-muted">
                                            {props.data.genre}
                                        </MDBCardText>
                                    </MDBCol>
                                    <MDBCol size="6" className="mb-3">
                                        <MDBTypography tag="h5">
                                            Fecha de publicaci??n
                                        </MDBTypography>
                                        <MDBCardText className="text-muted">
                                            {props.data.year}
                                        </MDBCardText>
                                    </MDBCol>
                                    <hr className="mt-0 mb-4 bodyHr" />
                                    <MDBCol size="6" className="mb-3">
                                        <a tag='a' href={props.data.author_wiki_url} target="_blank">
                                            <Icon className="Icons" icon="mdi:wikipedia" />
                                        </a>
                                        <p>Wikipedia del autor</p>
                                    </MDBCol>
                                    <MDBCol size="6" className="mb-3">
                                        <a tag='a' href={props.data.shop_url} target="_blank">
                                            <Icon className="Icons" icon="ri:amazon-fill"></Icon>
                                        </a>
                                        <p>C??mpralo</p>
                                    </MDBCol>
                                </MDBRow>
                                <br />
                                <MDBTypography className='dataHead' tag="h6">
                                    Sinopsis
                                </MDBTypography>
                                <br />
                                <hr className="mt-0 mb-4 bodyHr" />
                                <MDBRow className="pt-1">
                                    <MDBCol size="12" className="mb-3">
                                        <MDBCardText className="text-muted">
                                            {props.data.synopsis}
                                        </MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCol>
                    </MDBRow>
                </MDBCard>
            )
        }
    } else {

        return (

            <MDBCard className="mb-10 mainBookCard" style={{ borderRadius: '.5em' }}>
                <MDBRow className="g-0">
                    <MDBCol
                        md="3"
                        className="gradient-custom text-center text-white bookColData"
                        style={{ borderTopLeftRadius: '.5em', borderBottomLeftRadius: '.5em' }}
                    >
                        <MDBCardImage
                            src={props.data.book_cover}
                            alt="Avatar"
                            className="my-5 bookCardImg"
                            style={{ width: '12em' }}
                            fluid
                        />
                        <hr className="mt-0 mb-3" />
                        <br />
                        <MDBTypography tag="h5">{props.data.title}</MDBTypography>
                        <br />
                        <hr className="mt-0 mb-6" />
                        <br />
                        <MDBBtn
                            className='mx-2 bookCardBtn'
                            color='dark'
                            onClick={() => navigate(`/reviews/${props.data.id}`)}
                        >
                            Ver rese??as
                        </MDBBtn>
                        <br /><br />
                        <hr className="mt-0 mb-3" />
                        <br />
                        <MDBBtn
                            className='mx-2 bookCardBtn'
                            color='dark'
                            onClick={() => navigate(`/newReview/${props.data.id}`)}
                        >
                            A??adir rese??a
                        </MDBBtn>
                        <br /><br />
                    </MDBCol>
                    <MDBCol md="9">
                        <MDBCardBody className="p-4">
                            <br />
                            <MDBTypography className='dataHead' tag="h6">
                                Informaci??n
                            </MDBTypography>
                            <br />
                            <hr className="mt-0 mb-4 bodyHr" />
                            <MDBRow className="pt-1">
                                <MDBCol size="6" className="mb-3">
                                    <MDBTypography tag="h5">Autor</MDBTypography>
                                    <MDBCardText className="text-muted">
                                        {props.data.author}
                                    </MDBCardText>
                                </MDBCol>
                                <MDBCol size="6" className="mb-3">
                                    <MDBTypography tag="h5">Saga</MDBTypography>
                                    <MDBCardText className="text-muted">
                                        {props.data.series}
                                    </MDBCardText>
                                </MDBCol>
                                <MDBCol size="6" className="mb-3">
                                    <MDBTypography tag="h5">G??nero</MDBTypography>
                                    <MDBCardText className="text-muted">
                                        {props.data.genre}
                                    </MDBCardText>
                                </MDBCol>
                                <MDBCol size="6" className="mb-3">
                                    <MDBTypography tag="h5">
                                        Fecha de publicaci??n
                                    </MDBTypography>
                                    <MDBCardText className="text-muted">
                                        {props.data.year}
                                    </MDBCardText>
                                </MDBCol>
                                <hr className="mt-0 mb-4 bodyHr" />
                                <MDBCol size="6" className="mb-3">
                                    <a tag='a' href={props.data.author_wiki_url} target="_blank">
                                        <Icon className="Icons" icon="mdi:wikipedia" />
                                    </a>
                                    <p>Wikipedia del autor</p>
                                </MDBCol>
                                <MDBCol size="6" className="mb-3">
                                    <a tag='a' href={props.data.shop_url} target="_blank">
                                        <Icon className="Icons" icon="ri:amazon-fill"></Icon>
                                    </a>
                                    <p>C??mpralo</p>
                                </MDBCol>
                            </MDBRow>
                            <br />
                            <MDBTypography className='dataHead' tag="h6">
                                Sinopsis
                            </MDBTypography>
                            <br />
                            <hr className="mt-0 mb-4 bodyHr" />
                            <MDBRow className="pt-1">
                                <MDBCol size="12" className="mb-3">
                                    <MDBCardText className="text-muted">
                                        {props.data.synopsis}
                                    </MDBCardText>
                                </MDBCol>
                            </MDBRow>
                        </MDBCardBody>
                    </MDBCol>
                </MDBRow>
            </MDBCard>
        )
    }
}

export default BookCard