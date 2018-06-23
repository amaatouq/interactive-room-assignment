import { Conditions } from "../../api/conditions/conditions.js";
import { config } from "../../../experiment/server";

const admins = [
  {
    username: "admin",
    password: "84AB37AA-5F04-4A80-B47A-61976CF8B5E9"
  }
];

const bootstrapFunctions = [];
export const bootstrap = () => {
  bootstrapFunctions.forEach(f => f());
};

Meteor.startup(() => {
  bootstrap();
});

bootstrapFunctions.push(() => {
  admins.forEach(admin => {
    const exists = Meteor.users.findOne(_.omit(admin, "password"));
    if (!exists) {
      Accounts.createUser(admin);
    }
  });
});

const insertMissingValue = key => value => {
  const attributes = { type: key, value };
  if (!Boolean(Conditions.findOne(attributes))) {
    Conditions.insert(_.extend({ name: String(value) }, attributes), {
      autoConvert: false
    });
  }
};
bootstrapFunctions.push(() => {
  let order = 0;
  _.each(config.conditions, (definition, key) => {
    if (definition.allowedValues) {
      definition.allowedValues.forEach(insertMissingValue(key));
    }
    if (definition.type === Boolean) {
      [true, false].forEach(insertMissingValue(key));
    }
  });
});
