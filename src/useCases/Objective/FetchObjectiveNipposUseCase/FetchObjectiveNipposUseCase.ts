import { format } from "date-fns";
import { Nippo, NippoModel } from "~/models/Nippo";
import { PaginationResult } from "~/models/PaginationResult";

export class FetchObjectiveNipposUseCase {
  async execute({
    objectiveId,
    page,
    limit,
  }: {
    objectiveId: string;
    page: number;
    limit: number;
  }): Promise<PaginationResult<Nippo>> {
    const result = await NippoModel.paginate(
      { objectiveId, date: { $lte: format(new Date(), "yyyy-MM-dd") } },
      { sort: { date: -1 }, page, limit },
    );

    return new PaginationResult<Nippo>({
      ...result,
      docs: result.docs.map((doc) => doc.toObject()),
    });
  }
}
