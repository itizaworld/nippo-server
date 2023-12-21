import { Objective } from "~/models/Objective";
import { prisma } from "~/prisma";

export class RetrieveObjectiveBySlugUseCase {
  async execute({ slug }: { slug: string }): Promise<Objective> {
    return await prisma.objectives.findUnique({
      where: {
        slug,
      },
      include: {
        createdUser: false,
      },
    });
  }
}
