// prisma/seed.ts
import { PrismaClient, Prisma } from '@prisma/client';
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {

    console.log("SEED CATEGORIES")

    const categories = [
        { content: "Inteligência Artificial" , iconName: "tb/TbBrandOpenai" },
        { content: "Copywriting"             , iconName: "tb/TbWriting"     },
        { content: "Finanças"                , iconName: "tb/TbCoin"        },
        { content: "Recursos Humanos"        , iconName: "tb/TbUsersGroup"  },
        { content: "Aprendizagem e Educação" , iconName: "tb/TbBooks"       },
        { content: "Gestão"                  , iconName: "tb/TbBuilding"    },
        { content: "Marketing e Vendas"      , iconName: "tb/TbTargetArrow" },
        { content: "Produtividade"           , iconName: "tb/TbListCheck"   },
        { content: "Programação"             , iconName: "tb/TbCode"        },
        { content: "SEO"                     , iconName: "tb/TbWorldSearch" },
        { content: "Social Media"            , iconName: "tb/TbShare"       },
        { content: "Esporte e Fitness"       , iconName: "tb/TbRun"         },
        { content: "UI/UX Design"            , iconName: "lu/LuPencilRuler" },
        { content: "Outros"                  , iconName: "ci/CiCircleMore"  },
    ];

    for (const category of categories) {
        try {
            await prisma.categoryPrompt.create({
                data: category,
            });
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                // The .code property can be accessed in a type-safe manner
                if (e.code === 'P2002') {
                    console.log('Unique constraint violation')
                }
            }
            // throw e
        }
    }

    console.log("SEED USER")

    try {
        await prisma.user.create({
            data: {
                name: "Matheus Nascimento",
                email: "math.tcl@gmail.com",
                password: await hash("JesusREI#0707", 10)
            },
        });
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (e.code === 'P2002') {
                console.log('Unique constraint violation')
            }
        }
        // throw e
    }
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
