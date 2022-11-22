import BucketListSection from "../../components/Section/BucketListSection";
import UserBucketlist from "../../components/UserBucketlist";
import "./BucketList.scss"

const BucketList = () => {
    return (
        <div className="bucket-list-wrapper">
            <BucketListSection />
            <UserBucketlist />
        </div>
    )
}

export default BucketList;