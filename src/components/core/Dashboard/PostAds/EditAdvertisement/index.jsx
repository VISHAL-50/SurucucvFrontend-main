import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updateAdvertisement } from "../../services/advertisementAPI";

export default function EditAdvertisement({ adData }) {
  const { register, handleSubmit } = useForm({ defaultValues: adData });
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(updateAdvertisement(adData._id, data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" {...register("title")} placeholder="Ad Title" />
      <textarea {...register("description")} placeholder="Ad Description" />
      <input type="date" {...register("startDate")} />
      <input type="number" {...register("publicationPeriod")} placeholder="Publication Period (Days)" />
      <button type="submit">Update Advertisement</button>
    </form>
  );
}
