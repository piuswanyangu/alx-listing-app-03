import { PROPERTYLISTINGSAMPLE } from "@/constants";
import { useRouter } from "next/router";
import  PropertyDetail from '@/components/property/PropertyDetail';

export default function PropertyPage() {
    const router = useRouter();
    const { id } = router.query;
    const property = PROPERTYLISTINGSAMPLE.find((item) => item.name === id);

    if (!property) return <p>Property not found</p>;

    return (
        <div>
            <PropertyDetail property={property} />
        </div>
    )
}