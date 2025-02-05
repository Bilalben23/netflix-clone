import {
    Accordion,
    AccordionItem,
    AccordionItemButton,
    AccordionItemHeading,
    AccordionItemPanel
} from 'react-accessible-accordion'
import "react-accessible-accordion/dist/fancy-example.css";
import { faqData } from '../../data/faqData';



export default function FAQSection() {
    return (

        <div className='w-[90%] mx-auto md:w-[80%] my-4'>
            <h5 className='text-lg font-semibold mb-2'>Frequently Asked Questions</h5>
            <Accordion allowZeroExpanded className='rounded-md flex flex-col gap-y-3'>
                {
                    faqData.map(item => (
                        <AccordionItem key={item.id} uuid={item.id}>
                            <AccordionItemHeading >
                                <AccordionItemButton style={{
                                    backgroundColor: "#3F3F3F",
                                    color: "#f5f5f5",
                                    borderRadius: "12px",
                                    padding: "25px"
                                }}>
                                    {item.question}
                                </AccordionItemButton>
                            </AccordionItemHeading>

                            <AccordionItemPanel className='flex flex-col gap-y-2 p-5 bg-[#3F3F3F] my-3 rounded-xl'>
                                {
                                    item.answers.map((answer, index) => {
                                        return <p key={index} >{answer}</p>
                                    })
                                }

                            </AccordionItemPanel>
                        </AccordionItem>
                    ))
                }
            </Accordion>
        </div>
    )
}


