// import { useContext } from 'react';
// import Accordion from 'react-bootstrap/Accordion';
// import AccordionContext from 'react-bootstrap/AccordionContext';
// import { useAccordionButton } from 'react-bootstrap/AccordionButton';
// import Card from 'react-bootstrap/Card';
// import ServiceForm from '../Services/ServicesNewForm';
// import ServicesForm from '../Services/ServicesNewForm';


// const PINK = 'rgba(255, 192, 203, 0.6)';
// const BLUE = 'rgba(0, 0, 255, 0.6)';

// function ContextAwareToggle({ children, eventKey, callback }) {
//   const { activeEventKey } = useContext(AccordionContext);

//   const decoratedOnClick = useAccordionButton(
//     eventKey,
//     () => callback && callback(eventKey),
//   );

//   const isCurrentEventKey = activeEventKey === eventKey;

//   return (
//     <button
//       type="button"
//       style={{ backgroundColor: isCurrentEventKey ? PINK : BLUE }}
//       onClick={decoratedOnClick}
//     >
//       {children}
//     </button>
//   );
// }

// function  AddButton() {
//   return (
//     <Accordion defaultActiveKey="0">
//       <Card>
//         <Card.Header>
//           <ContextAwareToggle eventKey="0">ADD SERVICE</ContextAwareToggle>
//         </Card.Header>
//         <Accordion.Collapse eventKey="0">
//           <Card.Body><ServiceForm/></Card.Body>
//           {/* <ServicesForm/> */}

//         </Accordion.Collapse>
//       </Card>

//     </Accordion>
//   );
// }

//  export default AddButton;