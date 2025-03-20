import React from "react";
import Money_loan_calculator from '../Verticle Residential_component/Money_loan_calculator/Money_loan_calculator'
import Mortgage_property from '../Verticle Residential_component/Residential_mortgage/Mortgage_property'
import Property_DOCS from '../Verticle Residential_component/Property_Docs/Property_DOCS'
import Contact_property from '../Verticle Residential_component/Contact Property/Contact_property'

function Residential_vert_section() {
    return (
        <>
            <div className="flex flex-col gap-[35px]">
                <Mortgage_property />
                <Money_loan_calculator />

                <Property_DOCS />
                <Contact_property />
            </div>
        </>
    )
}

export default Residential_vert_section;